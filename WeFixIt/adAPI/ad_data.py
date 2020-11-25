import matplotlib.pyplot as plt
from .models import Advertisement


def create_and_save_data():
    """
    create_and_save_data queries the Advertisement objects and creates a graph of the advertisements and
    displays each by name and click-through-rate. The generated image is then saved to
    adAPI/static/adAPI/performance.png
    """
    advertisements = Advertisement.objects.all()
    click_rates = []
    headers = []
    for ad in advertisements:
        click_rates.append(ad.clicks / ad.views)
        headers.append(ad.header_text)
    fig = plt.figure()
    ax = fig.ad_axes([0, 0, 1, 1])
    ax.bar(headers, click_rates)
    plt.savefig('static/adAPI/performance.png')
