from django.shortcuts import render
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
from .models import Brownies

def index(request):
    brownies = Brownies.objects.all()
    geolocator = Nominatim(user_agent="upa_map")
    try:
        location = geolocator.geocode(
            "Universidad Politécnica de Atlacomulco, Atlacomulco, México", timeout=5)
    except (GeocoderTimedOut, Exception):
        location = None

    if not location:
        # Coordenadas aproximadas si falla la búsqueda
        class Dummy:
            latitude = 19.84045965339353 
            longitude = -99.90191688799564
            address = "Universidad Politécnica de Atlacomulco (aproximada)"
        location = Dummy()


    return render(request, 'index.html', 
                  {'location': location,
                    'brownies' : brownies  
                    })
def carrito(request):
    return render(request, 'carrito.html', {})