from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from common.infer_and_convert_data_types import process_csv, process_excel

@api_view(['GET'])
def hello_world(request):
    """
    A simple API endpoint to return a 'Hello, world!' message.
    """
    return Response({'message': 'Hello, world!'})

@api_view(['POST'])
def process_data(request):
    """
    API endpoint to process uploaded CSV or Excel files.
    """
    # Get the uploaded file from the request
    uploaded_file = request.FILES.get('file')

    # Check if a file was uploaded
    if not uploaded_file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    # Determine the file type and process accordingly
    if uploaded_file.name.endswith('.csv'):
        # Process CSV file
        try:
            data = process_csv(uploaded_file, chunksize=10000)
            # Extract data types information
            # data_types_info = data.dtypes.apply(lambda x: x.name).to_dict()
            # Convert DataFrame to list of dictionaries
            data_list = data.to_dict(orient='records')
            # Return response as JSON object
            return JsonResponse({'success': True, 'data': data_list})
        except ValueError as e:
            return JsonResponse({'error': str(e)}, status=400)
    elif uploaded_file.name.endswith(('.xls', '.xlsx')):
        # Process Excel file
        try:
            data = process_excel(uploaded_file, chunksize=10000)
            # Convert DataFrame to list of dictionaries
            data_list = data.to_dict(orient='records')
            # Return response as JSON object
            return JsonResponse({'success': True, 'data': data_list})
        except ValueError as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Unsupported file format'}, status=400)
