import SQLite
import Foundation
import Combine

class CatDataStore {
    static let DIR_TASK_DB = "CatDB"
    static let STORE_NAME = "cat.sqlite3"

    private let cats = Table("cat")

    private let id = Expression<Int64>("id")
    private let name = Expression<String>("name")
    private let breed = Expression<String>("breed")
    private let gender = Expression<String>("gender")
    private let age = Expression<String>("age")
    private let healthProblem = Expression<String>("healthProblem")
    private let description = Expression<String>("description")

    static let shared = CatDataStore()

    private var db: Connection? = nil
    
    @Published var dataChanged: Bool = false

    private init() {
        if let docDir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first {
            let dirPath = docDir.appendingPathComponent(Self.DIR_TASK_DB)

            do {
                try FileManager.default.createDirectory(atPath: dirPath.path, withIntermediateDirectories: true, attributes: nil)
                let dbPath = dirPath.appendingPathComponent(Self.STORE_NAME).path
                db = try Connection(dbPath)
                createTable()
                print("SQLiteDataStore init successfully at: \(dbPath) ")
            } catch {
                db = nil
                print("SQLiteDataStore init error: \(error)")
            }
        } else {
            db = nil
        }
    }

    private func createTable() {
        guard let database = db else {
            return
        }
        do {
            try database.run(cats.create { table in
                table.column(id, primaryKey: .autoincrement)
                table.column(name)
                table.column(breed)
                table.column(gender)
                table.column(age)
                table.column(healthProblem)
                table.column(description)
            })
            print("Table Created...")
        } catch {
            print("Table creation error: \(error)")
        }
    }
    
    func insert(name: String, breed: String, gender: String, age: String, healthProblem: String, description: String) throws -> Int64? {
        guard let database = db else { throw DatabaseError.databaseNotInitialized }
        
        do {
            let insert = cats.insert(self.name <- name,
                                     self.breed <- breed,
                                     self.gender <- gender,
                                     self.age <- age,
                                     self.healthProblem <- healthProblem,
                                     self.description <- description)
            let rowID = try database.run(insert)
            dataChanged.toggle()
            return rowID
        } catch {
            throw DatabaseError.insertFailed("Cat already in database.")
        }
    }
    
    
    func getAll() throws -> [Cat] {
        var cats: [Cat] = []
        guard let database = db else { throw DatabaseError.databaseNotInitialized }

        do {
            for cat in try database.prepare(self.cats) {
                let idString = String(cat[id])
                cats.append(Cat(id: idString, name: cat[name], breed: cat[breed], gender: cat[gender], age: cat[age], healthProblem: cat[healthProblem], description: cat[description]))
            }
        } catch {
            throw DatabaseError.fetchFailed("Couldn't fetch the list.")
        }
        return cats
    }
    
    enum CustomResult<T> {
        case success(T)
        case failure(Error)
    }

    func getAllAsync(completion: @escaping (CustomResult<[Cat]>) -> Void) {
        DispatchQueue.global(qos: .background).async {
            do {
                let cats = try self.getAll()
                DispatchQueue.main.async {
                    completion(.success(cats))
                }
            } catch {
                DispatchQueue.main.async {
                    completion(.failure(error))
                }
            }
        }
    }
    
    func update(id: Int64, name: String, breed: String, gender: String, age: String, healthProblem: String, description: String) throws -> Bool {
        guard let database = db else { throw DatabaseError.databaseNotInitialized }
        let cat = cats.filter(self.id == id)
        
        do {
            let update = cat.update([
                self.name <- name,
                self.breed <- breed,
                self.gender <- gender,
                self.age <- age,
                self.healthProblem <- healthProblem,
                self.description <- description
            ])
            if try database.run(update) > 0 {
                dataChanged.toggle()
                return true
            }
        } catch {
            throw DatabaseError.updateFailed("Cat does not exist.")
        }
        
        return false
    }

    func delete(id: Int64) throws -> Bool {
        guard let database = db else { throw DatabaseError.databaseNotInitialized }
        let cat = cats.filter(self.id == id)
        
        do {
            let delete = cat.delete()
            try database.run(delete)
            dataChanged.toggle()
            return true
        } catch {
            throw DatabaseError.deleteFailed("Cat does not exist.")
        }
    }
}
