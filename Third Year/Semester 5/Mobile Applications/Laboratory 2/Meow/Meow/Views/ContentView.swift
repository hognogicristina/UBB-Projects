import SwiftUI

struct ContentView: View {
    @EnvironmentObject var listViewModel: ListViewModel
    
    var body: some View {
        ZStack {
            Image("home")
                .resizable()
                .scaledToFill()
                .edgesIgnoringSafeArea(.all)
            
            VStack(spacing: 20) {
                Text("Welcome to Meow")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(.blue)
                
                Text("The “Adopt a Cat” app for your next fluffy friend")
                    .font(.headline)
                    .foregroundColor(.blue)
                    .multilineTextAlignment(.center)
        
                Spacer()
            }
        }
        .navigationBarItems(
            leading: 
                NavigationLink(destination: ListView()) {
                    Image(systemName: "list.bullet.clipboard")
                },
            trailing: NavigationLink(destination: AddView()) {
                    Image(systemName: "plus.square.on.square.fill")
            })
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            ContentView()
        }
        .environmentObject(ListViewModel())
    }
}
