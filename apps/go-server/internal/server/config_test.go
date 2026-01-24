package server

import "testing"

func TestConfig_Validate(t *testing.T) {
	tests := []struct {
		name    string
		config  Config
		wantErr bool
	}{
		{
			name: "Valid Config",
			config: Config{
				Host:     "localhost",
				Port:     8080,
				LogLevel: "INFO",
			},
			wantErr: false,
		},
		{
			name: "Empty Host",
			config: Config{
				Host:     "",
				Port:     8080,
				LogLevel: "INFO",
			},
			wantErr: true,
		},
		{
			name: "Invalid Port Zero",
			config: Config{
				Host:     "localhost",
				Port:     0,
				LogLevel: "INFO",
			},
			wantErr: true,
		},
		{
			name: "Invalid Port Negative",
			config: Config{
				Host:     "localhost",
				Port:     -1,
				LogLevel: "INFO",
			},
			wantErr: true,
		},
		{
			name: "Invalid Log Level",
			config: Config{
				Host:     "localhost",
				Port:     8080,
				LogLevel: "VERBOSE",
			},
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := tt.config.Validate(); (err != nil) != tt.wantErr {
				t.Errorf("Config.Validate() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
