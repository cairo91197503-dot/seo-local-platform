import { Shield, Clock, Sparkles, TrendingUp, CheckCircle2, Circle, ArrowRight, Info, QrCode } from "lucide-react";
import { Link } from "react-router";

export default function Dashboard() {
  const features = [
    { icon: Shield, title: "REPUTAÇÃO", desc: "Fortaleça sua presença e conquiste confiança." },
    { icon: Clock, title: "HORÁRIOS", desc: "Descubra os melhores horários para postar." },
    { icon: Sparkles, title: "CONTEÚDO COM IA", desc: "Crie posts incríveis com inteligência artificial." },
    { icon: TrendingUp, title: "RESULTADOS", desc: "Acompanhe métricas e veja seu negócio crescer." }
  ];

  const tasks = [
    { id: 1, title: "Responder a 2 avaliações no Google", completed: true },
    { id: 2, title: "Postar uma foto no perfil da empresa", completed: false },
    { id: 3, title: "Atualizar horário de funcionamento", completed: false }
  ];

  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = (completedTasks / tasks.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="text-center md:text-left py-4">
        <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-1">Visão Geral</h2>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Reputação. Conteúdo. Resultados.</h1>
      </div>

      {/* Feature Pills (Horizontal Scroll on Mobile) */}
      <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar">
        {features.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <div key={i} className="min-w-[260px] bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                <Icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{feat.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mt-0.5">{feat.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Welcome Card */}
      <div className="bg-blue-600 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1">Olá, Usuário! 👋</h2>
          <p className="text-blue-100">Bem-vindo ao seu painel LocalPulse.</p>
        </div>
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Tasks */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-gray-900">Tarefas Diárias</h3>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {completedTasks}/{tasks.length}
            </span>
          </div>
          
          <div className="mb-6 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className="flex items-start gap-3 group cursor-pointer">
                {task.completed ? (
                  <CheckCircle2 size={22} className="text-green-500 shrink-0 mt-0.5" />
                ) : (
                  <Circle size={22} className="text-gray-300 group-hover:text-blue-400 shrink-0 mt-0.5 transition-colors" />
                )}
                <span className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700 font-medium'}`}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Reputation Score */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Score de Reputação</h3>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-5xl font-black text-blue-600 tracking-tighter">78</span>
              <span className="text-xl text-gray-400 font-medium mb-1.5">/ 100</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '78%' }}></div>
            </div>
            <p className="text-sm text-gray-500 font-medium">Sua reputação está crescendo!</p>
          </div>

          {/* Quick Actions */}
          <Link to="/diagnosis" className="flex items-center gap-4 bg-indigo-50 hover:bg-indigo-100 transition-colors rounded-3xl p-5 border border-indigo-100">
            <div className="w-12 h-12 bg-white text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-indigo-900 text-sm">Diagnóstico com IA</h3>
              <p className="text-xs text-indigo-700/70 mt-0.5">Analise sua reputação online</p>
            </div>
            <ArrowRight size={20} className="text-indigo-400" />
          </Link>

          <Link to="/qrcode" className="flex items-center gap-4 bg-emerald-50 hover:bg-emerald-100 transition-colors rounded-3xl p-5 border border-emerald-100">
            <div className="w-12 h-12 bg-white text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
              <QrCode size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-emerald-900 text-sm">QR Code de Avaliações</h3>
              <p className="text-xs text-emerald-700/70 mt-0.5">Gere e compartilhe seu QR Code</p>
            </div>
            <ArrowRight size={20} className="text-emerald-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
