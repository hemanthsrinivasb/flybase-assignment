import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, Eye, Zap } from 'lucide-react';

interface IncidentAlertProps {
    onDeploy: () => void;
}

const IncidentAlert: React.FC<IncidentAlertProps> = ({ onDeploy }) => {
    const [progress, setProgress] = useState(0);

    // Simulate auto-launch sequence
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(old => Math.min(old + 2, 100)); // 50 steps * 2% = 100% in ~couple seconds
        }, 50);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* LEFT: Alert Context */}
            <div className="flex flex-col gap-6">
                <motion.div
                    initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    className="bg-red-500/10 border-l-4 border-red-500 p-6 backdrop-blur-md rounded-r-lg"
                >
                    <div className="flex items-center gap-3 text-red-500 mb-2">
                        <AlertTriangle className="w-8 h-8 animate-pulse" />
                        <h1 className="text-3xl font-bold tracking-tighter uppercase">Intrusion Detected</h1>
                    </div>
                    <p className="text-xl text-white/80 font-light">
                        Motion sensors and thermal imaging confirm 2 human subjects in restricted inventory zone.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-black/50 border border-white/10 p-4 rounded-xl"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Location</div>
                            <div className="flex items-center gap-2 text-white font-medium">
                                <MapPin className="w-4 h-4 text-flyt-accent" />
                                Luxury Car Dealership - North Lot
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Time</div>
                            <div className="text-white font-mono">02:34:08 AM</div>
                        </div>
                    </div>

                    <div className="h-48 rounded-lg bg-gray-900 border border-white/5 relative overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                            alt="CCTV"
                        />

                        {/* AI Overlay Box mockup */}
                        <div className="absolute top-1/2 left-1/3 w-24 h-32 border-2 border-red-500 rounded-sm shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                            <div className="absolute -top-6 left-0 bg-red-500 text-black text-[10px] font-bold px-1 py-0.5">HUMAN (99%)</div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 w-24 h-32 border-2 border-red-500 rounded-sm shadow-[0_0_15px_rgba(239,68,68,0.5)] translate-x-4 translate-y-2">
                            <div className="absolute -top-6 left-0 bg-red-500 text-black text-[10px] font-bold px-1 py-0.5">HUMAN (96%)</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* RIGHT: AI Response & Action */}
            <div className="flex flex-col gap-4 justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-flyt-card/80 border border-white/10 p-6 rounded-2xl shadow-2xl backdrop-blur-xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-flyt-500/20 flex items-center justify-center text-flyt-500">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Autonomous Response System</h3>
                            <p className="text-xs text-gray-400">Executing pre-defined security protocols</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-300">Launching Drone Interceptor 1</span>
                                <span className="text-flyt-accent font-mono">{progress}%</span>
                            </div>
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-flyt-accent shadow-[0_0_10px_#3B82F6]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-gray-400 opacity-60">
                            <div className="w-4 h-4 rounded-full border border-gray-600" />
                            <span>Notifying Local Police (Hold 30s)</span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-gray-400 opacity-60">
                            <div className="w-4 h-4 rounded-full border border-gray-600" />
                            <span>Locking Outer Gates</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10">
                        <p className="text-sm text-gray-400 mb-4 text-center">Operator Override Required to Escalate Immediately</p>
                        <button
                            onClick={onDeploy}
                            className="w-full py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/10 flex items-center justify-center gap-2"
                        >
                            <Eye className="w-5 h-5" />
                            CONFIRM THREAT & ENGAGE
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default IncidentAlert;
