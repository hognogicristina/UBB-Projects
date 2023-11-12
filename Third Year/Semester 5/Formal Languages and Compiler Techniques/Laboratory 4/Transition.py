class Transition:
    def __init__(self, from_state, to_state, label):
        self.from_state = from_state
        self.to_state = to_state
        self.label = label

    def get_from(self):
        return self.from_state

    def get_to(self):
        return self.to_state

    def get_label(self):
        return self.label

    def set_from(self, from_state):
        self.from_state = from_state

    def set_to(self, to_state):
        self.to_state = to_state

    def set_label(self, label):
        self.label = label
