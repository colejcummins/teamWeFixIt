# Generated by Django 3.1.3 on 2020-11-30 00:25

from django.db import migrations, models
import django_countries.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Advertisement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('header_text', models.CharField(max_length=400)),
                ('image', models.ImageField(blank=True, upload_to='')),
                ('second_text', models.CharField(max_length=400)),
                ('button_rendered_link', models.URLField()),
                ('clicks', models.PositiveBigIntegerField(default=0)),
                ('views', models.PositiveBigIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Campaign',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('countries', django_countries.fields.CountryField(max_length=746, multiple=True)),
                ('advertisements', models.ManyToManyField(to='adAPI.Advertisement')),
            ],
        ),
    ]