from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from common.infer_and_convert_data_types import process_csv, process_excel
from .models import UploadedData
from django.db.utils import IntegrityError

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
    
    UploadedData.objects.all().delete() # Clear existing data from the database
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
             # Save uploaded data to database
            for index, row in data.iterrows():
             data_instance = UploadedData.objects.create(data=row.to_dict())
            return JsonResponse({'success': True}, status=200)
        except IntegrityError:
            return JsonResponse({'error': 'Integrity error occurred, but data is ignored'}, status=200)
        except ValueError as e:
            return JsonResponse({'error': str(e)}, status=400)
    # Process Excel file
    elif uploaded_file.name.endswith(('.xls', '.xlsx')):
        # Process Excel file
        try:
            # Convert DataFrame to list of dictionaries
            data = process_excel(uploaded_file, chunksize=10000)
            for index, row in data.iterrows():
              data_instance = UploadedData.objects.create(data=row.to_dict())
            return JsonResponse({'success': True}, status=200)
        except IntegrityError:
            return JsonResponse({'error': 'Integrity error occurred, but data is ignored'}, status=200)
        except ValueError as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Unsupported file format'}, status=400)
    

def fetch_data(request):
    response = UploadedData.objects.all()
    data_list = []

    for data_instance in response:
        data_list.append(data_instance.data)

    return JsonResponse(data_list, safe=False)