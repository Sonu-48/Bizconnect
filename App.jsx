import { NavigationContainer } from "@react-navigation/native";
import { StatusBar} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackNavigation from "./src/navigation/StackNavigation";


function App(){
  return (
      <NavigationContainer>
        <SafeAreaProvider>
        <StatusBar backgroundColor="#00008B"/>
        <StackNavigation/>
        </SafeAreaProvider>
      </NavigationContainer>
  );
}
export default App;