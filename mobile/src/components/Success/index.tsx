import { 
    View,
    Image,
    Text,
    TouchableOpacity
} from "react-native";
import { styles } from './styles'
import successImg from "../../assets/success.png";
import { Copyright } from "../Copyright";

interface Props {
    onSendAnotherFeedback: () => void;
}

export function Success ({onSendAnotherFeedback}: Props) {
    return (
        <View style={styles.container}>
            <Image style={styles.image}
                source={successImg}
            />
            <Text style={styles.title}
            >
                Agradecemos o Feedback
            </Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={onSendAnotherFeedback}
            >
                <Text style={styles.buttonTitle}>
                    Quero enviar outro
                </Text>
            </TouchableOpacity>
            <Copyright></Copyright>
        </View>
    );
}