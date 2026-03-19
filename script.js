  /** --- LÓGICA PARA TXT --- **/
        let handleTxt;
        const statusTxt = document.getElementById('statusTxt');
        const btnGravarTxt = document.getElementById('btnGravarTxt');

        async function setHandleTxt(handle) {
            handleTxt = handle;
            statusTxt.innerText = "✅ Ativo: " + handle.name;
            statusTxt.style.color = "green";
            btnGravarTxt.disabled = false;
        }

        document.getElementById('btnCriarTxt').addEventListener('click', async () => {
            try {
                const h = await window.showSaveFilePicker({ types: [{ description: 'Texto', accept: {'text/plain': ['.txt']} }] });
                setHandleTxt(h);
            } catch (e) {}
        });

        document.getElementById('btnAbrirTxt').addEventListener('click', async () => {
            try {
                const [h] = await window.showOpenFilePicker({ types: [{ accept: {'text/plain': ['.txt']} }] });
                setHandleTxt(h);
            } catch (e) {}
        });

        document.getElementById('btnGravarTxt').addEventListener('click', async () => {
            const input = document.getElementById('inputTxt');
            const file = await handleTxt.getFile();
            const antigo = await file.text();
            const novo = antigo + `[${new Date().toLocaleString()}] ${input.value}\n`;
            
            const writer = await handleTxt.createWritable();
            await writer.write(novo);
            await writer.close();
            input.value = "";
            alert("Linha adicionada ao TXT!");
        });


        /** --- LÓGICA PARA JSON --- **/
        let handleJson;
        const statusJson = document.getElementById('statusJson');
        const btnGravarJson = document.getElementById('btnGravarJson');
        const previewJson = document.getElementById('previewJson');

        async function setHandleJson(handle) {
            handleJson = handle;
            statusJson.innerText = "✅ Ativo: " + handle.name;
            statusJson.style.color = "green";
            btnGravarJson.disabled = false;
            
            // Ler conteúdo inicial
            const file = await handle.getFile();
            previewJson.innerText = await file.text();
        }

        document.getElementById('btnCriarJson').addEventListener('click', async () => {
            try {
                const h = await window.showSaveFilePicker({ types: [{ description: 'JSON', accept: {'application/json': ['.json']} }] });
                const writer = await h.createWritable();
                await writer.write("[]");
                await writer.close();
                setHandleJson(h);
            } catch (e) {}
        });

        document.getElementById('btnAbrirJson').addEventListener('click', async () => {
            try {
                const [h] = await window.showOpenFilePicker({ types: [{ accept: {'application/json': ['.json']} }] });
                setHandleJson(h);
            } catch (e) {}
        });

        document.getElementById('btnGravarJson').addEventListener('click', async () => {
            const cat = document.getElementById('jsonCategoria');
            const msg = document.getElementById('jsonMensagem');

            const file = await handleJson.getFile();
            const texto = await file.text();
            let dados = JSON.parse(texto || "[]");

            dados.push({
                id: Date.now(),
                categoria: cat.value || "Geral",
                mensagem: msg.value,
                data: new Date().toLocaleString()
            });

            const final = JSON.stringify(dados, null, 4);
            const writer = await handleJson.createWritable();
            await writer.write(final);
            await writer.close();

            previewJson.innerText = final;
            msg.value = "";
          alert("Objeto adicionado ao JSON!");
          
          console.log(final)
        });