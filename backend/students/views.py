from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView
)
from rest_framework.permissions import AllowAny

from .models import Student
from .serializers import StudentSerializer



class StudentListCreateView(ListCreateAPIView):

    queryset = Student.objects.all().order_by('-id')
    serializer_class = StudentSerializer
    permission_classes = [AllowAny]



class StudentDetailView(RetrieveUpdateDestroyAPIView):

    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [AllowAny]