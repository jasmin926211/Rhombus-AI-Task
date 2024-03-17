import pandas as pd
from multiprocessing import Pool

def process_csv_chunk(chunk):
    """
    Process a chunk of a CSV file by inferring and converting data types.

    Parameters:
    - chunk: pandas.DataFrame
        A chunk of data read from a CSV file.

    Returns:
    pandas.DataFrame:
        Processed chunk with inferred and converted data types.
    """
    return infer_and_convert_data_types(chunk)

def process_csv(uploaded_file, chunksize=None):
    """
    Process a CSV file in parallel by reading and processing its chunks.

    Parameters:
    - uploaded_file: str
        Path to the uploaded CSV file.
    - chunksize: int, optional
        Number of rows to read per chunk. If None, the whole file is read at once.

    Returns:
    pandas.DataFrame:
        Concatenation of processed chunks with inferred and converted data types.
    """
    try:
        processed_dfs = []
        with Pool() as pool:
            for processed_chunk in pool.imap(process_csv_chunk, pd.read_csv(uploaded_file, chunksize=chunksize)):
                processed_dfs.append(processed_chunk)
        return pd.concat(processed_dfs)
    except Exception as e:
        raise ValueError(f"Error processing CSV: {str(e)}")

def process_excel_chunk(chunk):
    """
    Process a chunk of an Excel file by inferring and converting data types.

    Parameters:
    - chunk: pandas.DataFrame
        A chunk of data read from an Excel file.

    Returns:
    pandas.DataFrame:
        Processed chunk with inferred and converted data types.
    """
    return infer_and_convert_data_types(chunk)

def process_excel(uploaded_file, chunksize=None):
    """
    Process an Excel file in parallel by reading and processing its chunks.

    Parameters:
    - uploaded_file: str
        Path to the uploaded Excel file.
    - chunksize: int, optional
        Number of rows to read per chunk. If None, the whole file is read at once.

    Returns:
    pandas.DataFrame:
        Concatenation of processed chunks with inferred and converted data types.
    """
    try:
        processed_dfs = []
        with Pool() as pool:
            for processed_chunk in pool.imap(process_excel_chunk, pd.read_excel(uploaded_file, chunksize=chunksize)):
                processed_dfs.append(processed_chunk)
        return pd.concat(processed_dfs)
    except Exception as e:
        raise ValueError(f"Error processing Excel: {str(e)}")
    
def infer_and_convert_data_types(df):
    """
    Infer and convert data types of DataFrame columns.

    Parameters:
    - df: pandas.DataFrame
        DataFrame to infer and convert data types for.

    Returns:
    pandas.DataFrame:
        DataFrame with inferred and converted data types.
    """
    for col in df.columns:
        # Attempt to convert to numeric
        numeric_vals = pd.to_numeric(df[col], errors='coerce')
        if not numeric_vals.isna().all():  
            df[col] = numeric_vals
            continue

        # Attempt to convert to datetime
        try:
            date_vals = pd.to_datetime(df[col], errors='coerce', infer_datetime_format=True)
            if not date_vals.isna().all():
                df[col] = date_vals
                continue
        except (ValueError, TypeError):
            pass

        # Check if the column should be categorical
        if len(df[col].unique()) / len(df[col]) < 0.5:  
            df[col] = df[col].astype('category')

    return df
