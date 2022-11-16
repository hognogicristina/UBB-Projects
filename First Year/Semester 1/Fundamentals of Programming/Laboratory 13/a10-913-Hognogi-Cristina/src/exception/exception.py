class PersonDomainException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(message)


class ActivityDomainException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(message)


class PersonRepositoryException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(message)


class ActivityRepositoryException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(message)


class PersonValidatorsException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(message)

class BackValidatorException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(message)

class ActivityValidatorsException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(message)


class ActivPersValidatorsException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(message)


class UndoListException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(message)


class RedoListException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(message)

class StructureException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(message)