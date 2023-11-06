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
                
                NavigationLink(destination: ListView()) {
                    Text("Get Started")
                        .foregroundColor(.white)
                        .padding(.horizontal, 100)
                        .padding(.vertical, 10)
                        .background(Color.accentColor)
                        .cornerRadius(8)
                }
            }
        }
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
