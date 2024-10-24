import { ImageBackground } from "react-native"


const Profile = ()=>{
    return(
        <View
        style={[
          styles.headersection,
          {padding: 10, justifyContent: 'space-between', alignItems: 'center'},
        ]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios-new" size={25} color="#ffff" />
        </TouchableOpacity>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          style={[
            styles.textfield,
            {width:'60%', marginLeft: 20, padding: 5, marginTop: 0},
          ]}
          //   value={values.lname}
          //   onChangeText={handleChange('lname')}
          //   onBlur={handleBlur('lname')}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{marginRight:25}}>
            <Ionicons name="call-outline" size={25} color="#ffff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="videocam-outline" size={25} color="#ffff" />
          </TouchableOpacity>
        </View>
      </View>
    );
}
export default Profile;