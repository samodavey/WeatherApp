// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TextInput, 
} from 'react-native';
import Icon from "react-native-vector-icons/AntDesign"
import { Searchbar } from "react-native-paper"

const dev_Height = Dimensions.get('window').height
const dev_Width = Dimensions.get('window').width
//REQUIRES ERROR HANDLING FOR WRONG CITIES
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      city:"London",
      data:[],
      icon:"",
      city_display:"",
      desc:"",
      main:"",
      humidity:"",
      pressure:"",
      visibility:""
    }
    this.fetch_weather()
  }

  fetch_weather=()=>{
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+this.state.city+'&appid=01a27db238ee32fbc937b72e298d2030')     .then((response)=> response.json())
    .then((json=>{
      this.setState({data:json})
      this.setState({temp : (json.main.temp-273.15).toFixed(2)+" C"})
      this.setState({desc : json.weather[0].description})
      this.setState({city_display : json.name})
      this.setState({icon : json.weather[0].icon})
      this.setState({main : json.weather[0].main})
      this.setState({humidity : json.main.humidity + " %"})
      this.setState({pressure : json.main.pressure + " hPa"})
      this.setState({visibility : (json.visibility/1000).toFixed(2) + " Km"})
    })).catch((error)=>console.error(error))
  }

  render(){
    return (
        <ImageBackground
        source={{uri:"https://images.unsplash.com/photo-1610041502471-be78593ecd89?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfDZzTVZqVExTa2VRfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"}}
        style={styles.Image_Background_Style}>
          <SafeAreaView>
            <View style={styles.Search_Box_View}>
            <StatusBar barStyle='light-content'/>
              <Searchbar
                placeholder="Search"
                style={styles.Search_Box} 
                onChangeText={(text) => this.setState({city:text})}
                onIconPress={this.fetch_weather}
              />

            </View>
            {/* Change the background relevant to the country & city */}
            <View style={styles.Weather_Box_Main}>
              <View style={styles.Weather_Holder_View}>
                <Image source={{uri:"http://openweathermap.org/img/wn/"+this.state.icon+"@2x.png"}} style={styles.Weather_Image}/>
                <View>
                  <Text style={styles.city_display_text}>{this.state.city_display}</Text>
                  <Text style={styles.temperature_text}>{this.state.temp}</Text>
                </View>
              </View>
            </View>

            <View style={styles.Info_Box_View}>
              <View style={styles.Info_Holder_View}>
                <Text style={styles.Main_Weather_Text}>{this.state.main}</Text>
                <Text style={styles.description_text}>{this.state.desc}</Text>
                <Text style={styles.humidity_text}>{this.state.humidity}</Text>
                <Text style={styles.other_text}>{this.state.pressure}</Text>
                <Text style={styles.other_text}>{this.state.visibility}</Text>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image_Background_Style:{
    height: "100%",
    width:"100%"
  },
  Search_Box_View:{
    height:"20%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  },
  Search_Box:{
    height:"35%",
    width:"80%",
    borderWidth:1,
    borderRadius:15,
    color:"#FFF",
    backgroundColor:"rgba(255,255,255,0.5)",
    paddingHorizontal:15
  },
  button_touch:{
    marginLeft:"5%",
    height:"35%",
    width:"8%",
    justifyContent:"center",
    alignItems:"center"
  },
  Weather_Box_Main:{
    height:"30%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  },
  Weather_Holder_View:{
    height:"80%",
    width:"90%",
    backgroundColor:"rgba(255,255,255,0.3)",
    borderRadius:15,
    alignItems:"center",
    flexDirection:"row"
  },
  Weather_Image:{
    height:"80%",
    width:"50%"
  },
  temperature_text:{
    fontSize:30,
    color:"#FFF",
    marginLeft:"5%"
  },
  city_display_text:{
    fontSize:20,
    color:"#FFF",
    marginLeft:"5%",
    marginTop:"3%"
  },
  Info_Holder_View:{
    height:"80%",
    width:"90%",
    backgroundColor:"rgba(255,255,255,0.3)",
    borderRadius:15
  },
  Info_Box_View:{
    height:"45%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  Main_Weather_Text:{
    fontSize:28,
    color:"#FFF",
    marginLeft:"8%",
    marginTop:"8%"
  },
  description_text:{
    fontSize:20,
    color:"#FFF",
    marginLeft:"8%",
    marginTop:"5%",
  },
  humidity_text:{
    fontSize:18,
    color:"#FFF",
    marginLeft:"8%",
    marginTop:"8%"
  },
  other_text:{
    fontSize:18,
    color:"#FFF",
    marginLeft:"8%",
    marginTop:"2%"
  }
});
