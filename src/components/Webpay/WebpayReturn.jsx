import { useEffect, useState } from 'react';
import { commitTransaction } from '../../services/webpayService';
import './WebpayReturn.css';

export default function WebpayReturn({ token, onContinue }) {
    const [status, setStatus] = useState('processing');
    const [transaction, setTransaction] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const processReturn = async () => {
            if (!token) {
                setStatus('error');
                setError('No se recibió token de transacción');
                return;
            }

            // Simular delay de procesamiento
            await new Promise(resolve => setTimeout(resolve, 2000));

            try {
                // Confirmar la transacción
                const result = await commitTransaction(token);

                if (result.success) {
                    setStatus('success');
                    setTransaction(result.transaction);
                    
                    // Limpiar carrito después de pago exitoso
                    const pendingOrder = JSON.parse(localStorage.getItem('pending_order') || '{}');
                    if (pendingOrder.buyOrder) {
                        // Guardar orden completada
                        const completedOrders = JSON.parse(localStorage.getItem('completed_orders') || '[]');
                        completedOrders.push({
                            ...pendingOrder,
                            transaction: result.transaction,
                            status: 'completed',
                            completedAt: new Date().toISOString()
                        });
                        localStorage.setItem('completed_orders', JSON.stringify(completedOrders));
                        localStorage.removeItem('pending_order');
                    }
                } else {
                    setStatus('error');
                    setError(result.error || 'Error al confirmar la transacción');
                }
            } catch (err) {
                console.error('Error al procesar retorno de Webpay:', err);
                setStatus('error');
                setError('Ocurrió un error al procesar tu pago');
            }
        };

        processReturn();
    }, [token]);

    const handleContinue = () => {
        if (onContinue) {
            onContinue();
        } else {
            window.location.href = '/';
        }
    };

    return (
        <div className="webpay-return">
            <div className="webpay-return-container">
                {status === 'processing' && (
                    <div className="webpay-status processing">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <h2>Procesando tu pago...</h2>
                        <p>Por favor espera mientras confirmamos tu transacción.</p>
                    </div>
                )}

                {status === 'success' && transaction && (
                    <div className="webpay-status success">
                        <div className="status-icon">
                            <i className="fa-solid fa-circle-check"></i>
                        </div>
                        <h2>¡Pago Exitoso!</h2>
                        <p>Tu transacción ha sido procesada correctamente.</p>
                        
                        <div className="transaction-details">
                            <h3>Detalles de la Transacción</h3>
                            <div className="detail-row">
                                <span>Orden de Compra:</span>
                                <span>{transaction.buyOrder}</span>
                            </div>
                            <div className="detail-row">
                                <span>Monto:</span>
                                <span>${transaction.amount.toLocaleString('es-CL')}</span>
                            </div>
                            <div className="detail-row">
                                <span>Estado:</span>
                                <span className="status-badge success-badge">
                                    {transaction.status === 'AUTHORIZED' ? 'Autorizado' : transaction.status}
                                </span>
                            </div>
                            <div className="detail-row">
                                <span>Fecha:</span>
                                <span>{new Date(transaction.transactionDate).toLocaleString('es-CL')}</span>
                            </div>
                            {transaction.cardDetail && (
                                <div className="detail-row">
                                    <span>Tarjeta:</span>
                                    <span>**** **** **** {transaction.cardDetail.cardNumber}</span>
                                </div>
                            )}
                        </div>

                        <button onClick={handleContinue} className="continue-button">
                            Continuar Comprando
                        </button>
                    </div>
                )}

                {status === 'error' && (
                    <div className="webpay-status error">
                        <div className="status-icon">
                            <i className="fa-solid fa-circle-xmark"></i>
                        </div>
                        <h2>Error en el Pago</h2>
                        <p>{error || 'No se pudo procesar tu pago. Por favor intenta nuevamente.'}</p>
                        
                        <div className="error-actions">
                            <button onClick={handleContinue} className="continue-button">
                                Volver al Inicio
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

