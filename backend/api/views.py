from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializers import *


@api_view(['GET'])
def customers(request):

    data = Customer.objects.all()

    serializer = CustomerSerializer(data,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def products(request):

    data = Product.objects.all()

    serializer = ProductSerializer(data,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def save(request):

    serializer = EntrySerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response({
            "message": "Saved"
        })

    return Response(serializer.errors)


@api_view(['GET'])
def report(request):

    entries = Entry.objects.select_related(
        'customer',
        'product'
    )

    result = []

    for item in entries:

        result.append({

            "customer":
            item.customer.customer_name,

            "city":
            item.customer.city,

            "product":
            item.product.product_name,

            "price":
            item.product.price

        })

    return Response(result)
