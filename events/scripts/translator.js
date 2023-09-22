const translate = require("google-translate-api");

var langs = {
    "pt": {
        "system_errors": {
            "error_404": "Página não encontrada",
            "error_generic": "Ocorreu um erro"
        },
        "alerts": {
            "success": "Sucesso!",
            "info": "Informação",
            "warning": "Aviso"
        }
    },
    "en": {
        "system_errors": {
            "error_404": "Page not found",
            "error_generic": "An error occurred"
        },
        "alerts": {
            "success": "Success!",
            "info": "Info",
            "warning": "Warning"
        }
    },
    "fr": {
        "system_errors": {
            "error_404": "Page non trouvée",
            "error_generic": "Une erreur s'est produite"
        },
        "alerts": {
            "success": "Succès!",
            "info": "Info",
            "warning": "Avertissement"
        }
    }
}

async function translateText(text, targetLang) {
    try {
        const result = await translate(text, { to: targetLang });
        return result.text;
    } catch (error) {
        console.error("Translation error:", error);
        return text;
    }
}

function getTranslatedText(key, targetLang) {
    // Verificar se a chave existe nas traduções nativas
    if (langs[targetLang] && langs[targetLang][key]) {
        return langs[targetLang][key];
    } else {
        // Caso contrário, usar a tradução da função translateText
        return translateText(key, targetLang);
    }
}

// Exemplo de uso
function exemple() {
    const translatedError404 = getTranslatedText("system_errors.error_404", "fr");
    console.log(translatedError404); // Exibirá a tradução do erro 404 no idioma francês
} 
