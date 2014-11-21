from django.shortcuts import render


def index(request):
    return render(request, 'story/story.html', {})
