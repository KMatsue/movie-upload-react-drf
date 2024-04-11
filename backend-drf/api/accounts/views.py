from rest_framework import generics
from rest_framework.permissions import AllowAny


from .serializers import UserSerializer


class CreateUserView(generics.CreateAPIView):
    '''createに特化したAPIView'''
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)
