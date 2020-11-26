import matplotlib.pyplot as plt
from .models import Advertisement
import numpy as np


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
        if ad.views == 0:
            break
        click_rates.append(ad.clicks / ad.views)
        headers.append(ad.header_text)
    y_pos = np.arange(len(headers))

    plt.bar(y_pos, click_rates, align='center', alpha=.5)
    plt.xticks(y_pos, headers)
    plt.ylabel('Click Through Rate')
    plt.title('Ad Headers and Click Through Rate')
    plt.savefig('adAPI/static/adAPI/performance.png')
