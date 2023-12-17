import SwiftUI

@main
struct MeowApp: App {
    @StateObject var listViewModel: ListViewModel = ListViewModel()
    
    var body: some Scene {
        WindowGroup {
            NavigationView {
                ContentView()
            }
        }
        .environmentObject(listViewModel)
    }
}
