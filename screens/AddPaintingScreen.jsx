import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ScrollView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors, fontType } from '../src/theme';

export default function AddPaintingScreen() {
  const [namaLukisan, setNamaLukisan] = useState('');
  const [namaPenulis, setNamaPenulis] = useState('');
  const [kategori, setKategori] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Izin Akses Galeri',
            message: 'Aplikasi memerlukan akses ke galeri Anda',
            buttonNeutral: 'Tanya Nanti',
            buttonNegative: 'Tolak',
            buttonPositive: 'Izinkan',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) return;

    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log('Pemilihan dibatalkan');
        } else if (response.errorCode) {
          console.error('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          console.log('Image selected:', selectedImage.uri);
          setImageUri(selectedImage.uri);
        }
      }
    );
  };

  const handleSubmit = () => {
    // Simpan data ke SQLite atau backend di sini
    console.log({ namaLukisan, namaPenulis, kategori, imageUri });
    alert('Data lukisan berhasil disimpan!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tambah Data Lukisan</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nama Lukisan"
          value={namaLukisan}
          onChangeText={setNamaLukisan}
          placeholderTextColor={colors.grey()}
        />
        <TextInput
          style={styles.input}
          placeholder="Nama Penulis"
          value={namaPenulis}
          onChangeText={setNamaPenulis}
          placeholderTextColor={colors.grey()}
        />
        <TextInput
          style={styles.input}
          placeholder="Kategori"
          value={kategori}
          onChangeText={setKategori}
          placeholderTextColor={colors.grey()}
        />

        <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
          <Text style={styles.uploadText}>Upload Foto</Text>
        </TouchableOpacity>

        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        ) : (
          <Text style={styles.previewPlaceholder}>
            Belum ada foto yang dipilih
          </Text>
        )}

        <Button title="Simpan" onPress={handleSubmit} color={colors.maroon()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor: colors.maroon(),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.gold(),
  },
  form: {
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: colors.maroon(),
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontFamily: fontType['Pjs-Regular'],
    color: 'black',
  },
  uploadButton: {
    backgroundColor: colors.gold(),
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadText: {
    fontFamily: fontType['Pjs-Bold'],
    color: colors.maroon(),
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  previewPlaceholder: {
    textAlign: 'center',
    color: colors.grey(),
    marginBottom: 20,
    fontFamily: fontType['Pjs-Regular'],
  },
});
