import { useState } from 'react';
import { ArrowLeft } from 'phosphor-react-native';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity, 
    Image,
} from 'react-native';
import { theme } from '../../theme';
import { styles } from "./styles";
import { captureScreen } from "react-native-view-shot";
import { FeedbackType } from '../Widget';
import { feedbackTypes } from '../../utils/feedbackTypes'
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { api } from '../../libs/apis';
import * as FileSystem from 'expo-file-system';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;
}

export function Form({ 
    feedbackType,
    onFeedbackCanceled,
    onFeedbackSent
}: Props) {

    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [screenshot, setScreenshot] = useState<string|null>(null);
    const [comment, setComment] = useState<string>('');
    const feedbackInfo = feedbackTypes[feedbackType];

    function handleScreenshot() {
        captureScreen({
            format: "jpg",
            quality: 0.8
        })
        .then(uri => setScreenshot(uri))
        .catch(error => console.log(error))

    }

    function handleScreenshotRemove() {
        setScreenshot(null)
    }

    async function handleSendFeedback() {
        if (isSendingFeedback) 
            return;
        setIsSendingFeedback(true);
        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })
        try {
            await api.post('/feedback', {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment
            })
            onFeedbackSent();
        } catch(error) {
            console.log(error);
            setIsSendingFeedback(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft 
                        size={24}
                        weight="bold"    
                        color={theme.colors.text_secondary}
                    />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Image 
                        source={feedbackInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackInfo.title}
                    </Text>
                </View>
            </View>
            <TextInput 
                multiline
                style={styles.input}
                placeholder="Conte com detalhes o que está acontecendo..."
                placeholderTextColor={theme.colors.text_secondary}
                autoCorrect={false}
                onChangeText={setComment}
            />
            <View style={styles.footer}>
                <ScreenshotButton 
                    screenshot={screenshot}
                    onTakeShot={ handleScreenshot }    
                    onRemoveShot={ handleScreenshotRemove }    
                />
                <Button 
                    isLoading={isSendingFeedback}
                    onPress={handleSendFeedback}
                />
            </View>
        </View>
    )
}