import React,{useRef,useState,useEffect} from 'react';
import {View,StyleSheet,Dimensions,Image,Linking, TouchableOpacity,Alert, Text,Platform} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
import LocationEnabler from 'react-native-android-location-enabler';
import GetLocation from 'react-native-get-location';
import {requestPermission,ANDROID_LOCATION_PERMISSION,IOS_LOCATION_PERMISSION,checkPermission} from '../Utils/PermissionUtils';

const HomeScreen=props=>{

    console.log("STart     ",props.navigation.state);

    let mapView=useRef();
    const  {width,height} =Dimensions.get('window');
    const ASPECT_RATIO=width/height;
    const LATITUDE=21.6417;
    const LONGITUDE=69.6293;
    const LATITUDE_DELTA=0.009;
    const LONGITUDE_DELTA=0.009;

    const GOOGLE_MAP_APIKEY='AIzaSyDXBnqdTidT12S1Kmm1JhnfgR0Ueh70Zec';

    const staticCoordinate={
        latitude: 21.6417,
        longitude: 69.6293,
    }

    const [coordinate,setcoordinate]=useState({
        latitude:21.6417,
        longitude:69.6395
    })

const checkPermissions=async()=>{
    const locationPermissionRes = await checkPermission(
        Platform.select({
            android: ANDROID_LOCATION_PERMISSION,
            ios: IOS_LOCATION_PERMISSION,
        })
    );

    if (locationPermissionRes == "granted") {
        getUserCurrentLocationHandler();
    } else {
        const requestPermissionRes = await requestPermission(
            Platform.select({
                android: ANDROID_LOCATION_PERMISSION,
                ios: IOS_LOCATION_PERMISSION,
            })
        );

        switch (requestPermissionRes) {
            case "granted":
                getUserCurrentLocationHandler();
                break;
            case "denied":
                Toast("Permission Denied.");
                openSettingsHandler();
                break;
            case "blocked":
                openSettingsHandler();
                break;
            // case "limited":
            // 	getUserCurrentLocationHandler();
            // 	break;
            case "unavailable":
                Toast("Feature not supported on this device.");
                break;
        }
    }
    return;
}


const getUserCurrentLocationHandler=()=>{
    LocationEnabler.promptForEnableLocationIfNeeded({
        interval:1000,
        fastInterval:5000
    }).then((data)=>{
        console.log("Location Enable Data === > ",data);
        if(data==='already-enabled' || data==='enabled'){
            GetLocation.getCurrentPosition({
                enableHighAccuracy:true,
                timeout:15000
            }).then((locationData)=>{
                console.log("My Data :",locationData);
                // coordinate[0].latitude=locationData.latitude;
                // coordinate[0].longitude=locationData.longitude;
                setcoordinate({
                    ...coordinate,
                    latitude:locationData.latitude,
                    longitude:locationData.longitude})
                // setcoordinate([...coordinate,{latitude:locationData.latitude,longitude:locationData.longitude}])
            }).catch(err=>{
                console.log("Message      ",err);

            })
        }
    }).catch((err)=>{
        console.log("Error ===>  ",err)
        openSettingsHandler();
    });

}

const openSettingsHandler = async () => {
    try {
        return new Promise((resolve, reject) => {
            Alert.alert(
                "Permission Required",
                "Please allow Location Permission from app settings to continue using this application",
                [
                    {
                        text: "Open Settings",
                        style: "default",
                        onPress: async () => {
                            await Linking.openSettings();
                        },
                    },
                    {
                        text: "Cancel",
                        style: "cancel",
                        onPress: () => {
                            resolve(0);
                        },
                    },
                ]
            );
        });
    } catch (err) {
        console.log("[HomeScreen-openSettingsHandler] Error : ", err.message);
    }
};

    useEffect(()=>{
        checkPermissions();
       
    },[checkPermissions])

    const getData=value=>{
        console.log("get Data :",value);
        setcoordinate({
            ...coordinate,
            longitude:parseFloat(value.latitude),
            longitude:parseFloat(value.longitude)
        })
    }
    
    const onMapClickEvent=(event)=>{
        setcoordinate([...coordinate,event.nativeEvent.coordinate]);
    }

    console.log(coordinate);

    return(
    <View style={{flex:1}}>
        
    <MapView
        initialRegion={{
            latitude:LATITUDE,
            longitude:LONGITUDE,
            latitudeDelta:LATITUDE_DELTA,
            longitudeDelta:LONGITUDE_DELTA
        }}
        ref={mapView}
        zoomEnabled={true}
        showsCompass={true}
        showsBuildings={true}
        style={{flex:1}}
        onPress={onMapClickEvent}
        >
            {/* {
                coordinate.map((cordinates,index)=><MapView.Marker key={`coordinates_${index}`} coordinate={cordinates} ima />)
            } */}

            <MapView.Marker key={staticCoordinate} coordinate={staticCoordinate}>
                <Image source={require('../assets/pin.png')}  style={{height:30,width:30}} />
                {/* <View style={{
                    backgroundColor: "white", width: 200,
                    height: 30, top: 3, left: 20,
                    zIndex: 2, position: "absolute",
                }}>
                    <Text>Point A</Text>
                </View> */}

                <MapView.Callout tooltip style={{minWidth:100,maxWidth:200,backgroundColor:'white'}}>
                    <TouchableOpacity>
                    
                    <Text style={{fontSize:14}}>Point A</Text>
                    </TouchableOpacity>
                </MapView.Callout>
            </MapView.Marker>
            
            <MapView.Marker key={coordinate.latitude} coordinate={coordinate}>
                <Image source={require('../assets/pin_icon1.png')} resizeMode='contain' style={{height:30,width:30}} />
                <MapView.Callout tooltip style={{minWidth:100,maxWidth:200,backgroundColor:'white'}}>
                    <TouchableOpacity>
                    
                    <Text style={{fontSize:14}}>Point B</Text>
                    </TouchableOpacity>
                </MapView.Callout>
            </MapView.Marker>

            <MapViewDirections
            origin={staticCoordinate}
            waypoints={[]}
            destination={coordinate}
            apikey={GOOGLE_MAP_APIKEY}
            strokeWidth={7}
            strokeColor="#ff0000"
            optimizeWaypoints={true}
            onStart={(params)=>{
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result=>{
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);

                // mapView.fitToCoordinates(result.coordinates,{
                //     edgePadding:{
                //         right: (width / 20),
                //         bottom: (height / 20),
                //         left: (width / 20),
                //         top: (height / 20),
                //     }
                // });
            }}

            onError={(errorMessage)=>{
                console.log("Get AN Error")
            }}
            >

            </MapViewDirections>
        </MapView>

    <View style={{position:'absolute',alignSelf:'center',flexDirection:'row',bottom:'5%'}}>
    <TouchableOpacity 
    activeOpacity={0.6}
        style={styles.buttonStyle}>
            <Text style={styles.fontStyle}>Focus Me</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        alignSelf='flex-end'
        activeOpacity={0.6}
        onPress={()=>{
            props.navigation.navigate('Form',{
                getData:getData
            });
        }}
        style={{...styles.buttonStyle,marginLeft:20}}>
            <Text style={styles.fontStyle}>Click Me</Text>
        </TouchableOpacity>

    </View>
      
    </View>
)}

const styles=StyleSheet.create({
    fontStyle:{
        fontSize:20,
        color:'white'
    },
    buttonStyle:{
        paddingHorizontal:25,
        paddingVertical:5,
        backgroundColor:'#008ae6',
        borderRadius:30,
    }
})

export default HomeScreen;