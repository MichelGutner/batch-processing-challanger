/**
 * Interface for CSV Reader Service
 * This interface defines the methods required for processing CSV files and sending batches of data.
 * It is used to ensure that any implementation of the CSV Reader Service adheres to this contract.
 * The methods are asynchronous to handle file reading and data processing efficiently.
 */
export interface CsvReader {
  execute(filePath: string): Promise<void>;
}
