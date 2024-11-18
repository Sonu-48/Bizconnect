import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  scrollContainer:{
    flexGrow:1
  },
  h1: {
    fontSize: 35,
    fontWeight: '600',
    color: '#ffff',
  },
  h2: {
    fontSize: 28,
    fontWeight: '400',
    color: '#ffff',
    lineHeight: 35,
  },
  h3: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ffff',
  },
  h4: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 30,
    color:'#000',
  },
  h5: {
    fontSize: 18,
    fontWeight: '500',
    color:'#ffff',
  },
  h6: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: '#ffff',
    marginTop: 10,
  },
  btn: {
    fontWeight: '500',
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#ADD8E6',
    width: 233,
    height: 62,
  },
  // btn1: {
  //   fontWeight: '500',
  //   paddingTop: 15,
  //   paddingBottom: 15,
  //   paddingLeft: 40,
  //   paddingRight: 40,
  //   borderRadius: 23,
  //   backgroundColor: '#25435F',
  //   marginBottom: 15,
  // },
  disabledBtn: {
    opacity: 0.2,
  },
  btntext: {
    color: '#392381',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  btntext1: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  // btn2: {
  //   fontWeight: '500',
  //   padding: 15,
  //   borderRadius: 23,
  //   backgroundColor: '#DCDEE0',
  //   marginTop: 10,
  // },
  // btntext2: {
  //   color: '#25435F',
  //   fontSize: 20,
  //   fontWeight: '600',
  //   textAlign: 'center',
  // },
  textfield: {
    backgroundColor: '#FFFFFF',
    // borderColor: '#25435F',
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 20,
    fontSize: 18,
    marginTop: 10,
  },
  reviewtext:{
    marginTop:5,
    color:'#000'
  },
  reviewtext:{
paddingTop:5
  },
  inputfield: {
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    borderColor: '#898585',
    borderWidth: 1,
    fontSize: 18,
    paddingLeft: 10,
  },
  textfield_wrapper: {
    width: '100%',
    marginBottom: 15,
  },
  chatinboxwrapper:{
    backgroundColor:'#FFFFFF',
    marginVertical:5,
    flexDirection:'row',
    justifyContent:'space-between',
    padding:13
  },
  errortext: {
    color: 'red',
    fontWeight: '400',
    paddingLeft:20,
    marginTop: 5,
  },
  whitebox: {
    backgroundColor: '#F4F3F3',
    flex: 1,
    borderRadius: 10,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  headersection: {
    backgroundColor: '#00008B',
    width: '100%',
    // height: 65,
    flexDirection:'row',
   alignItems:'center',
   justifyContent:'center',
   borderBottomLeftRadius:10,
   borderBottomRightRadius:10,
   marginTop:1,
   paddingTop:12,
   paddingBottom:12
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    height:200,
    marginHorizontal:10
  },
  wrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:10
  },
  invoiceContainer:{
    backgroundColor:'#ffff',
    padding:10,
    marginTop:5,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  paymenttxt:{
    marginTop:20,
    marginLeft:20,
    marginBottom:10,
    color:"black",
    fontSize:18,
    fontWeight:"regular"
  },
  textinpt:{
    width:"90%",
    backgroundColor:"#D9D9D9",
    borderRadius:10,
    alignSelf:"center",
    paddingHorizontal:20
    // height:"20%"
},
  // ordersbox: {
  //   flex: 1,
  //   // backgroundColor:'#65778a',
  //   backgroundColor: '#0e7882',
  //   borderRadius: 16,
  //   opacity: 0.7,
  //   elevation: 4,
  //   shadowColor: '#000',
  //   shadowOffset: {width: 0, height: 4},
  //   shadowOpacity: 0.4,
  //   shadowRadius: 4,
  //   padding: 20,
  //   margin: 7,
  //   borderLeftWidth: 4,
  //   borderColor: '#25435F',
  //   borderRightWidth: 4,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 80,
    width: '100%',
    paddingHorizontal: 15,
  },
  modalcontianer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  activetabbtn: {
    // backgroundColor:'#25435F',
    borderRadius: 20,
    padding: 15,
  },
  tabbtn: {
    // backgroundColor:'#F4F3F3',
    borderRadius: 20,
    padding: 15,
  },
  activetabttext: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  tabttext: {
    color: '#898585',
    fontSize: 16,
    fontWeight: '500',
  },
  booking_heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 0,
  },
  // modalView: {
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  //   padding: 20,
  //   width: '100%',
  //   // height:500,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  icon_wrapper: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_center: {
    textAlign: 'center',
    paddingTop: 8,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  
  btnview2: {
    width:'100%',
    justifyContent:"space-around",
    flexDirection:"row",
    // alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    marginTop:15,
    padding: 5,
    alignItems: 'center',
    borderRadius:20
},
divider:{
  backgroundColor:'#D9D9D9',
  width:'60%',
  margin:'auto',
  height:2
},
reviewwrappper:{
  backgroundColor:'#D9D9D9',
  borderRadius:10,
  padding:15,
  marginTop:20,
  marginBottom:20
},
header: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
  color:'#fff',
},
subHeader: {
  color:'#fff',
  fontSize: 16,
  marginBottom: 20,
},
inputContainer: {
  width: '100%',
  alignItems: 'center',
},
otpContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 20,
},
otpBox: {
  width: 50,
  height: 50,
  borderWidth: 1,
  borderRadius: 8,
  textAlign: 'center',
  fontSize: 24,
  margin: 5,
  borderColor:'#ffff'
},
});
export default styles;
