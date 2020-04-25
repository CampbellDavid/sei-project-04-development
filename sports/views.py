# pylint: disable=no-member

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Sport
from .serializers import PopulatedSportSerializer, SportSerializer
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class SportListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        sports = Sport.objects.all()
        serialized_sports = PopulatedSportSerializer(sports, many=True)
        return Response(serialized_sports.data)

    def post(self, request):
        sport = SportSerializer(data=request.data)
        request.data['owner'] = request.user.id
        if sport.is_valid():
            sport.save()
            return Response(sport.data, status=HTTP_201_CREATED)
        return Response(sport.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class SportDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request, pk):
        try:
            sport = Sport.objects.get(pk=pk)
            serialized_sport = PopulatedSportSerializer(sport)
            return Response(serialized_sport.data)
        except Sport.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            sport = Sport.objects.get(pk=pk)
            request.data['owner'] = request.user.id
            updated_sport = SportSerializer(sport, data=request.data)
            if updated_sport.is_valid():
                updated_sport.save()
                return Response(updated_sport.data, status=HTTP_202_ACCEPTED)
            return Response(updated_sport.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        except Sport.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def delete(self, _request, pk):
        try:
            sport = Sport.objects.get(pk=pk)
            sport.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except Sport.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)
