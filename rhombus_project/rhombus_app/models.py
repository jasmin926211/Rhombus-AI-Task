# models.py
from django.db import models

class UploadedData(models.Model):
    data = models.JSONField(null=True, blank=True)

    def __str__(self):
        return str(self.data)
