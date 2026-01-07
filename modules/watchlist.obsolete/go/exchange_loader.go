package watchlist

import (
	"embed"
	"encoding/csv"
	"fmt"
	"io"
	"sort"

	"golang.org/x/text/encoding/charmap"
)

//go:embed data/ISO10383_MIC.csv
var micData embed.FS

// LoadExchanges loads the ISO 10383 MIC data from the embedded CSV file.
// It decodes ISO-8859-1, filters for active operating MICs, and sorting.
// It triggers a panic if the data is invalid (Fail Fast).
func LoadExchanges() {
	f, err := micData.Open("data/ISO10383_MIC.csv")
	if err != nil {
		panic(fmt.Sprintf("failed to open embedded MIC data: %v", err))
	}
	defer f.Close()

	// Wrap in ISO-8859-1 decoder
	decoder := charmap.ISO8859_1.NewDecoder().Reader(f)
	reader := csv.NewReader(decoder)

	// Read header
	header, err := reader.Read()
	if err != nil {
		panic(fmt.Sprintf("failed to read MIC CSV header: %v", err))
	}

	// Map header columns to indices
	colMap := make(map[string]int)
	for i, h := range header {
		colMap[h] = i
	}

	// Required columns
	requiredCols := []string{"MIC", "OPERATING MIC", "OPRT/SGMT", "MARKET NAME-INSTITUTION DESCRIPTION", "ISO COUNTRY CODE (ISO 3166)", "CITY", "ACRONYM", "STATUS"}
	for _, col := range requiredCols {
		if _, ok := colMap[col]; !ok {
			panic(fmt.Sprintf("missing required column in MIC CSV: %s", col))
		}
	}

	var loaded []*Exchange

	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			panic(fmt.Sprintf("failed to parse MIC CSV record: %v", err))
		}

		oprtSgmt := record[colMap["OPRT/SGMT"]]
		status := record[colMap["STATUS"]]

		// FR-002: Filter for OPRT (Operating MICs) and ACTIVE status
		if oprtSgmt == "OPRT" && status == "ACTIVE" {
			mic := record[colMap["MIC"]] // Operating MIC matches MIC for OPRT records
			name := record[colMap["MARKET NAME-INSTITUTION DESCRIPTION"]]
			country := record[colMap["ISO COUNTRY CODE (ISO 3166)"]]
			city := record[colMap["CITY"]]
			acronym := record[colMap["ACRONYM"]]

			// FR-010: Pre-formatted Display Name logic
			// Format: "ACRONYM - NAME (COUNTRY)" or "NAME (COUNTRY)" if no acronym
			displayName := fmt.Sprintf("%s (%s)", name, country)
			if acronym != "" {
				displayName = fmt.Sprintf("%s - %s", acronym, displayName)
			}

			loaded = append(loaded, &Exchange{
				OperatingMIC: mic,
				ExchangeName: name,
				DisplayName:  displayName,
				Country:      country,
				City:         city,
				Acronym:      acronym,
			})
		}
	}

	// FR-004: Sort by Country (primary) and Exchange Name (secondary)
	sort.Slice(loaded, func(i, j int) bool {
		if loaded[i].Country != loaded[j].Country {
			return loaded[i].Country < loaded[j].Country
		}
		return loaded[i].ExchangeName < loaded[j].ExchangeName
	})

	Exchanges = loaded
}
