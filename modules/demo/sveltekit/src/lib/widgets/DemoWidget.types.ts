/**
 * Flattened props interface for Storybook controls
 * This allows individual controls for each demo widget attribute
 */
export interface IDemoWidgetStory {
  status?: string;
  count?: number;
  onIncrement?: () => void;
  onStatusChange?: (newStatus: string) => void;
}

export interface IDemoState {
  status: string;
  count: number;
}
