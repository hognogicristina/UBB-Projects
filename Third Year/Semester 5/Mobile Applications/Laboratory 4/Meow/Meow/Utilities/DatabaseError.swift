enum DatabaseError: Error {
    case databaseNotInitialized
    case fetchFailed(String)
    case insertFailed(String)
    case updateFailed(String)
    case deleteFailed(String)
}
