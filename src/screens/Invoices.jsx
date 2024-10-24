import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles/Styles';
import { useNavigation } from '@react-navigation/native';

const invoiceData = [
  {
    id: 1,
    name: 'John Doe',
    InvoiceNo: 'INV0031',
    price: '$295,26',
    status: 'Due',
    invociedate: '11/17/2022',
  },
  {
    id: 2,
    name: 'John Doe',
    InvoiceNo: 'INV0031',
    price: '$295,26',
    status: 'Due',
    invociedate: '11/17/2022',
  },
  {
    id: 3,
    name: 'John Doe',
    InvoiceNo: 'INV0031',
    price: '$295,26',
    status: 'Due',
    invociedate: '11/17/2022',
  },
  {
    id: 4,
    name: 'John Doe',
    InvoiceNo: 'INV0031',
    price: '$295,26',
    status: 'Due',
    invociedate: '11/17/2022',
  },
  {
    id: 5,
    name: 'John Doe',
    InvoiceNo: 'INV0031',
    price: '$295,26',
    status: 'Due',
    invociedate: '11/17/2022',
  },
  {
    id: 6,
    name: 'John Doe',
    InvoiceNo: 'INV0031',
    price: '$295,26',
    status: 'Due',
    invociedate: '11/17/2022',
  },
  {
    id: 7,
    name: 'John Doe',
    InvoiceNo: 'INV0031',
    price: '$295,26',
    status: 'Due',
    invociedate: '11/17/2022',
  },
  {
    id: 8,
    name: 'John Doe',
    InvoiceNo: 'INV0031',
    price: '$295,26',
    status: 'Due',
    invociedate: '11/17/2022',
  },
  {
    id: 9,
    name: 'John Doe',
    InvoiceNo: 'INV0031',
    price: '$295,26',
    status: 'Due',
    invociedate: '11/17/2022',
  },
];

const renderInvoiceData = ({item}) => {
  return (
    <View style={styles.invoiceContainer}>
      <View>
        <Text style={[styles.h3,{color:'#000000'}]}>{item.name}</Text>
        <Text>{item.InvoiceNo}</Text>
      </View>
      <View>
        <Text style={[styles.h3,{color:'#000000'}]}>{item.price}</Text>
        <Text>{item.status}</Text>
        <Text>{item.invociedate}</Text>
      </View>
    </View>
  );
};

const Invoices = () => {
    const navigation = useNavigation();
  return (
    <>
      {/*headersection */}
      <View style={[styles.headersection, {paddingTop: 20, paddingBottom: 20}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            left: 10,
            width: 50,
            height: 50,
            top: 25,
          }}>
          <MaterialIcons name="arrow-back-ios-new" size={25} color="#ffff" />
        </TouchableOpacity>
        <Text style={styles.h3}>Invoices</Text>
      </View>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#eeee',
          }}>
          <Text>2022</Text>
          <Text>$3,365</Text>
        </View>
        <FlatList
          data={invoiceData}
          renderItem={renderInvoiceData}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.scrollContainer}
        />
        <TouchableOpacity onPress={()=>navigation.navigate('AddInvoices')} style={{backgroundColor:'#00008B',width:70,height:70,borderRadius:100,alignItems:'center',justifyContent:'center',alignSelf:'flex-end'}}>
        <MaterialIcons name="add" size={40} color="#ffff" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Invoices;
