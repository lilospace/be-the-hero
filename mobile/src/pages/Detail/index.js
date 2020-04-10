import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import Logo from '../../assets/logo.png';
import styles from './style';




export default function Detail() {
    const route = useRoute();

    const incident = route.params.incident;
    const navigation = useNavigation();
    const message = `Olá ${incident.name}, estou entrando em contato, pois gostaria de ajudar no caso ${incident.title} com valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`;
    function navigateback() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso : ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWpp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}?&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={Logo} />
                <TouchableOpacity onPress={navigateback}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.Incident}>
                <Text style={[styles.IncidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.IncidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.IncidentProperty}>CASO:</Text>
                <Text style={styles.IncidentValue}>{incident.description}</Text>

                <Text style={styles.IncidentProperty}>Valor:</Text>
                <Text style={styles.IncidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.herotitle}> Salve o dia</Text>
                <Text style={styles.heroTitle}> Seja um herói desse caso </Text>

                <Text style={styles.heroDescription}>Entre em contato </Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWpp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}
