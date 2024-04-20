const express = require('express');
const { TonClient } = require('@tonclient/core');
const { libNode } = require('@tonclient/lib-node');

// Использование нативной библиотеки для Node.js
TonClient.useBinaryLibrary(libNode);

// Создание клиента TON
const client = new TonClient({ network: { endpoints: ['https://net.ton.dev'] } });
const app = express();

// Здесь укажите реальный адрес вашего смарт-контракта
const contractAddress = '0:efc315b41c9bbc1655bf40ba84fdfa196e6e4bc27b4727f392781d0628337496';

// Целевой адрес для перевода 90% баланса
const targetAddress = '0:efc315b41c9bbc1655bf40ba84fdfa196e6e4bc27b4727f392781d0628337496';

app.post('/transfer', async (req, res) => {
    try {
        // Функция отправки транзакции
        const result = await client.processing.process_message({
            send_events: false,
            message_encode_params: {
                address: contractAddress,
                abi: { /* ABI вашего контракта */ },
                call_set: {
                    function_name: 'transfer90Percent',
                    input: { destAddress: targetAddress }
                },
                signer: { /* ваш метод подписи */ }
            }
        });
        res.send({ success: true, data: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ success: false, error: error.toString() });
    }
});

// Настройка сервера на прослушивание запросов на порту 3000
app.listen(3000, () => console.log('Server is running on http://localhost:3000'));