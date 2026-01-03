import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Map as MapIcon, Video, CheckCircle } from 'lucide-react';

interface CommandMapProps {
    onEndIncident: () => void;
}

const CommandMap: React.FC<CommandMapProps> = () => {
    const [activeView, setActiveView] = useState<'MAP' | 'FEED'>('MAP');
    const [tasks, setTasks] = useState([
        { id: 1, text: "Deploy Drone 2 for Perimeter Scan", status: 'pending', recommended: true },
        { id: 2, text: "Notify Security Team Alpha", status: 'pending', recommended: true },
        { id: 3, text: "Share Live Feed with Police", status: 'waiting', recommended: false },
    ]);

    // Simulated AI suggestion effect
    React.useEffect(() => {
        const timer = setTimeout(() => {
            // Simulate AI "thinking" and analyzing the scene
            const newAiTasks = [
                { id: 10, text: "Lockdown Sector 4 Gates", status: 'pending', recommended: true },
                { id: 11, text: "Activate Strobes on Drone 1", status: 'pending', recommended: true }
            ];

            // Merge with existing
            setTasks(prev => {
                // Avoid duplicates if effect runs twice
                if (prev.find(t => t.id === 10)) return prev;
                return [...newAiTasks, ...prev];
            });
        }, 2500); // 2.5s delay for realism

        return () => clearTimeout(timer);
    }, []);

    const handleTaskAction = (id: number) => {
        setTasks(ts => ts.map(t => t.id === id ? { ...t, status: 'done' } : t));
    };

    return (
        <div className="flex-1 flex overflow-hidden">

            {/* LEFT: Main Tactical Display */}
            <div className="flex-1 relative bg-gray-900 group">

                {/* View 1: MAP (Tactical Satellite) */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${activeView === 'MAP' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    {/* Satellite Background */}
                    <div className="absolute inset-0 bg-cover bg-center grayscale-[0.3]"
                        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url("https://images.unsplash.com/photo-1624389650080-6925501fb355?q=80&w=2574&auto=format&fit=crop")' }} // Parking lot / Industrial top down
                    >
                        {/* Map Markers Overlay - Only visible in MAP view */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                            {/* Drone 1 */}
                            <motion.div
                                className="absolute top-[40%] left-[45%]"
                                animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-8 h-8 rounded-full border-2 border-flyt-accent bg-flyt-accent/20 flex items-center justify-center shadow-[0_0_20px_#3B82F6]">
                                    <div className="w-2 h-2 bg-flyt-accent rounded-full" />
                                </div>
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-flyt-accent bg-black/50 px-1 rounded whitespace-nowrap">DRONE-1 (INTERCEPT)</div>
                            </motion.div>

                            {/* Threat Marker */}
                            <motion.div
                                className="absolute top-[38%] left-[55%]"
                                animate={{ x: [0, 5, -5, 0], opacity: [1, 0.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="w-6 h-6 rounded-full border-2 border-red-500 bg-red-500/20 flex items-center justify-center shadow-[0_0_20px_#EF4444]">
                                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                                </div>
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-red-500 bg-black/50 px-1 rounded">INTRUDER</div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* View 2: FEED (Drone Camera) */}
                <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${activeView === 'FEED' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Drone Feed" />

                    {/* HUD Overlay */}
                    <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none">
                        <div className="absolute top-4 left-4 text-green-500 font-mono text-xs">
                            <div>REC ● 00:04:12</div>
                            <div>ALT: 45m</div>
                            <div>SPD: 12m/s</div>
                        </div>
                        {/* Crosshair */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-green-500/50 flex items-center justify-center">
                            <div className="w-1 h-1 bg-green-500" />
                        </div>
                    </div>
                </div>

                {/* Overlay Controls */}
                <div className="absolute top-4 left-4 flex gap-2 z-20">
                    <button
                        onClick={() => setActiveView('MAP')}
                        className={`p-3 rounded-lg backdrop-blur-md border transition-all ${activeView === 'MAP' ? 'bg-flyt-500 text-white border-flyt-500 shadow-[0_0_15px_#3B82F6]' : 'bg-black/50 text-gray-400 border-white/10 hover:bg-black/70'}`}
                    >
                        <MapIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setActiveView('FEED')}
                        className={`p-3 rounded-lg backdrop-blur-md border transition-all ${activeView === 'FEED' ? 'bg-flyt-500 text-white border-flyt-500 shadow-[0_0_15px_#3B82F6]' : 'bg-black/50 text-gray-400 border-white/10 hover:bg-black/70'}`}
                    >
                        <Video className="w-5 h-5" />
                    </button>
                </div>

                {/* Picture-in-Picture (Shows the OTHER view) */}
                <div className="absolute bottom-4 left-4 w-72 aspect-video bg-black border border-white/20 rounded-lg overflow-hidden shadow-2xl z-20 cursor-pointer hover:scale-105 transition-transform" onClick={() => setActiveView(activeView === 'MAP' ? 'FEED' : 'MAP')}>
                    {activeView === 'MAP' ? (
                        <>
                            {/* Mini Feed */}
                            <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-[10px] uppercase font-bold text-white bg-black/50 px-1 rounded">Live Feed: D1</span>
                            </div>
                            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" />
                        </>
                    ) : (
                        <div className="w-full h-full bg-slate-800 relative">
                            {/* Mini Map */}
                            <div className="absolute top-2 left-2 z-10">
                                <span className="text-[10px] uppercase font-bold text-white bg-black/50 px-1 rounded">Tactical Map</span>
                            </div>
                            <img src="https://images.unsplash.com/photo-1624389650080-6925501fb355?q=80&w=2574&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 grayscale" />
                            {/* Simple dots for mini map */}
                            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_5px_blue] -translate-x-2 -translate-y-2"></div>
                            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_5px_red] translate-x-2 translate-y-2"></div>
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT: AI Action Center */}
            <div className="w-96 bg-gray-900 border-l border-white/10 flex flex-col">
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-gray-300">Mission Control</h3>
                    <div className="text-[10px] bg-flyt-accent/20 text-flyt-accent px-2 py-1 rounded border border-flyt-accent/30 font-mono">
                        AI ACTIVE
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Context Widget */}
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                        <Users className="w-5 h-5 text-gray-400" />
                        <div>
                            <div className="text-xs text-gray-400">Security Team</div>
                            <div className="text-sm font-medium">ETA: 4 mins</div>
                        </div>
                    </div>

                    {/* AI Tasks List */}
                    <div className="space-y-3">
                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Recommended Actions</div>

                        {tasks.map(task => (
                            <motion.div
                                layout
                                key={task.id}
                                className={`relative p-4 rounded-xl border transition-all ${task.status === 'done' ? 'bg-green-900/10 border-green-500/30' : 'bg-flyt-card border-white/10 hover:border-flyt-accent/50'}`}
                            >
                                {task.recommended && task.status !== 'done' && (
                                    <div className="absolute -top-2 -right-2 bg-flyt-accent text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-blue-500/50">
                                        AI SUGGESTION
                                    </div>
                                )}

                                <div className="flex items-start gap-3">
                                    <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center border ${task.status === 'done' ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                                        {task.status === 'done' && <CheckCircle className="w-3 h-3 text-black" />}
                                    </div>
                                    <div>
                                        <p className={`text-sm font-medium ${task.status === 'done' ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                                            {task.text}
                                        </p>
                                        {task.status !== 'done' && (
                                            <button
                                                onClick={() => handleTaskAction(task.id)}
                                                className="mt-3 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded transition-colors"
                                            >
                                                Execute
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Chat / Log Placeholder */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="text-xs text-gray-500 mb-2">SYSTEM LOG</div>
                        <div className="space-y-2 font-mono text-[10px] text-gray-400">
                            <p>{'>'} ALERT: Motion detected Zone 4</p>
                            <p>{'>'} AUTO: Drone 1 launched</p>
                            <p>{'>'} AI: Subject identified (Human)</p>
                            <p className="text-flyt-accent">{'>'} OP: Threat Confirmed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommandMap;
