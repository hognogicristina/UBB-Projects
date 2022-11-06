from src.domain.board import Board
from src.domain.circle import Circle
from src.domain.player import Player
from src.domain.ai import AI

from src.service.board_service import BoardService
from src.service.ai_service import AIService

from src.ui.ui import UI

if __name__ == "__main__":
    board_service = BoardService()
    ai_service = AIService()
    ui = UI(board_service, ai_service)
    ui.menu()