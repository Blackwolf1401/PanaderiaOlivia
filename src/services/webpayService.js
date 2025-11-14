/**
 * Servicio para integrar Webpay de Transbank
 * 
 * NOTA: En producción, esto debe ejecutarse en el backend por seguridad.
 * Este es un ejemplo de cómo se integraría desde el frontend.
 * 
 * Para desarrollo, usa el entorno de pruebas de Transbank:
 * https://www.transbankdevelopers.cl/documentacion/como_empezar#ambiente-de-integracion
 */

// Configuración para desarrollo (Sandbox)
const WEBPAY_CONFIG = {
    // En producción, estas credenciales deben estar en el backend
    // En Vite, las variables de entorno se acceden con import.meta.env y deben tener prefijo VITE_
    apiKeyId: import.meta.env.VITE_WEBPAY_API_KEY_ID || '597055555532',
    commerceCode: import.meta.env.VITE_WEBPAY_COMMERCE_CODE || '597055555532',
    environment: import.meta.env.VITE_WEBPAY_ENV || 'TEST', // TEST o PRODUCTION
    returnUrl: `${window.location.origin}/webpay/return`,
    finalUrl: `${window.location.origin}/webpay/final`
};

/**
 * Crea una transacción en Webpay
 * @param {Object} orderData - Datos de la orden
 * @param {number} orderData.amount - Monto total
 * @param {string} orderData.buyOrder - Número de orden único
 * @param {string} orderData.sessionId - ID de sesión
 * @returns {Promise<Object>} Respuesta de Webpay con token y URL
 */
export async function createTransaction(orderData) {
    try {
        // En producción, esto debe hacerse desde el backend
        // Por ahora, simulamos la creación de transacción
        
        const { amount, buyOrder, sessionId } = orderData;
        
        // Simulación de creación de transacción
        // En producción, harías una llamada a tu backend que se comunica con Webpay
        const mockResponse = {
            token: `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            url: WEBPAY_CONFIG.environment === 'TEST' 
                ? 'https://webpay3gint.transbank.cl/webpayserver/initTransaction'
                : 'https://webpay3g.transbank.cl/webpayserver/initTransaction'
        };

        // Guardar datos de la transacción en localStorage para referencia
        localStorage.setItem('webpay_transaction', JSON.stringify({
            buyOrder,
            amount,
            sessionId,
            token: mockResponse.token,
            timestamp: new Date().toISOString()
        }));

        return {
            success: true,
            token: mockResponse.token,
            url: mockResponse.url
        };
    } catch (error) {
        console.error('Error al crear transacción Webpay:', error);
        return {
            success: false,
            error: error.message || 'Error al procesar la transacción'
        };
    }
}

/**
 * Confirma una transacción de Webpay
 * @param {string} token - Token de la transacción
 * @returns {Promise<Object>} Resultado de la confirmación
 */
export async function commitTransaction(token) {
    try {
        // En producción, esto debe hacerse desde el backend
        const transactionData = JSON.parse(localStorage.getItem('webpay_transaction') || '{}');
        
        if (!transactionData.token || transactionData.token !== token) {
            return {
                success: false,
                error: 'Token de transacción inválido'
            };
        }

        // Simulación de confirmación exitosa
        // En producción, harías una llamada a tu backend
        const mockResponse = {
            vci: 'TSY',
            amount: transactionData.amount,
            status: 'AUTHORIZED',
            buyOrder: transactionData.buyOrder,
            sessionId: transactionData.sessionId,
            cardDetail: {
                cardNumber: '6623'
            },
            accountingDate: new Date().toISOString().split('T')[0],
            transactionDate: new Date().toISOString()
        };

        // Limpiar datos de transacción
        localStorage.removeItem('webpay_transaction');

        return {
            success: true,
            transaction: mockResponse
        };
    } catch (error) {
        console.error('Error al confirmar transacción Webpay:', error);
        return {
            success: false,
            error: error.message || 'Error al confirmar la transacción'
        };
    }
}

/**
 * Genera un número de orden único
 */
export function generateBuyOrder() {
    return `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

/**
 * Genera un ID de sesión único
 */
export function generateSessionId() {
    return `SESSION_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Formatea el monto para Webpay (debe ser sin decimales)
 */
export function formatAmountForWebpay(amount) {
    // Webpay espera el monto en centavos (sin decimales)
    return Math.round(amount);
}

