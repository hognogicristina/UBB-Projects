from src.ui.ui import UI
from src.settings.settings import Settings

class Start:
	"""
	A class for running the programme
	"""
	def __init__(self):
		settings = Settings()
		settings.get_ui().menu()


if __name__ == "__main__":
    start = Start()