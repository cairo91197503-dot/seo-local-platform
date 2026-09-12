/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Terminal, CheckCircle, Key, FileCode } from 'lucide-react';

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-50 text-gray-900">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Ambiente Atualizado</h1>
        <p className="text-gray-600 mb-8">
          Os secrets foram revisados e o ambiente Docker foi orquestrado para os testes do LocalPulse.
        </p>

        <div className="grid gap-4 md:grid-cols-2 text-left mb-8">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <Key className="w-5 h-5 text-blue-500" />
              <h2 className="font-semibold">Secrets Revisados</h2>
            </div>
            <p className="text-sm text-slate-600">
              O seu <code>.env</code> e <code>secrets.properties</code> foram reconhecidos. O sistema está configurado para injetar estas chaves durante a execução dos testes.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <FileCode className="w-5 h-5 text-purple-500" />
              <h2 className="font-semibold">Docker Configurado</h2>
            </div>
            <p className="text-sm text-slate-600">
              Foram criados os arquivos <code>Dockerfile</code> e <code>docker-compose.yml</code> com a imagem do Ubuntu e Android SDK para orquestrar os testes no terminal local.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 text-slate-300 p-5 rounded-xl text-left font-mono text-sm overflow-x-auto">
          <div className="flex items-center gap-2 mb-3 text-slate-400 border-b border-slate-700 pb-2">
            <Terminal className="w-4 h-4" />
            <span>Instruções de Execução Local</span>
          </div>
          <p className="mb-2"># 1. Clone o repositório localmente</p>
          <p className="text-green-400 mb-4">git clone https://github.com/cairo91197503-dot/LocalPulse.git</p>
          
          <p className="mb-2"># 2. Execute os testes com o Docker Compose</p>
          <p className="text-green-400">docker-compose up --build</p>
        </div>
      </div>
    </div>
  );
}
