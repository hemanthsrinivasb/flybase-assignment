import React, { useState } from 'react';

import { FileText, Download, Share2, CheckCheck, PlayCircle, Map } from 'lucide-react';

interface EvidencePreviewProps {
    onReset: () => void;
}

const EvidencePreview: React.FC<EvidencePreviewProps> = ({ onReset }) => {
    const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');
    const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'complete'>('idle');

    const handleShareReport = () => {
        // Generate a shareable report link
        const reportUrl = `${window.location.origin}/reports/INC-2026-0883-X`;

        // Copy to clipboard
        navigator.clipboard.writeText(reportUrl).then(() => {
            setShareStatus('copied');
            setTimeout(() => setShareStatus('idle'), 2000);
        }).catch(() => {
            // Fallback for older browsers
            alert(`Report Link: ${reportUrl}`);
        });
    };

    const handleDownloadPackage = () => {
        setDownloadStatus('downloading');

        // Simulate download preparation (2 seconds)
        setTimeout(() => {
            // Create a dummy file download
            const reportData = {
                incidentId: 'INC-2026-0883-X',
                timestamp: new Date().toISOString(),
                location: 'Luxury Car Dealership - Zone 4',
                threat: 'Confirmed Intrusion (2 subjects)',
                response: 'Drone Interceptor 1 deployed',
                resolution: 'Security team arrived, suspects detained',
                evidence: {
                    videos: 4,
                    images: 12,
                    flightLogs: '1.2MB',
                    totalSize: '250MB'
                }
            };

            const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'INC-2026-0883-X-Evidence-Package.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            setDownloadStatus('complete');
            setTimeout(() => setDownloadStatus('idle'), 3000);
        }, 2000);
    };

    return (
        <div className="h-full max-w-6xl mx-auto flex flex-col">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-500/20 rounded-full text-green-500">
                        <CheckCheck className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Incident Resolved</h1>
                        <p className="text-gray-400">Reference ID: #INC-2026-0883-X</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleShareReport}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                    >
                        <Share2 className="w-4 h-4" />
                        {shareStatus === 'copied' ? '✓ Link Copied!' : 'Share Report'}
                    </button>
                    <button
                        onClick={handleDownloadPackage}
                        disabled={downloadStatus === 'downloading'}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/25 ${downloadStatus === 'downloading'
                                ? 'bg-gray-600 cursor-not-allowed'
                                : downloadStatus === 'complete'
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-flyt-500 hover:bg-flyt-600'
                            }`}
                    >
                        <Download className={`w-4 h-4 ${downloadStatus === 'downloading' ? 'animate-bounce' : ''}`} />
                        {downloadStatus === 'downloading'
                            ? 'Preparing...'
                            : downloadStatus === 'complete'
                                ? '✓ Downloaded!'
                                : 'Download Package (250MB)'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 flex-1 overflow-y-auto pb-8 min-h-0">
                {/* Generated Media Grid */}
                <div className="col-span-2 space-y-6">
                    <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <PlayCircle className="w-5 h-5 text-flyt-accent" />
                            Key Video Evidence (AI Selected)
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-video bg-black rounded-lg relative overflow-hidden group cursor-pointer border border-transparent hover:border-flyt-accent/50 transition-all">
                                    <img
                                        src={`https://images.unsplash.com/photo-1621947081720-86970823b77a?q=80&w=2558&auto=format&fit=crop`}
                                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div className="absolute bottom-2 left-2 text-[10px] bg-black/60 px-2 py-0.5 rounded font-mono text-white">
                                        CAM-{i} • 02:35:{i}0 AM
                                    </div>
                                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-flyt-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">
                                        TARGET LOCKED
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                            <Map className="w-5 h-5 text-purple-400" />
                            Flight Logs & GPS Tracks
                        </h3>
                        <div className="h-48 bg-black/40 rounded-xl relative overflow-hidden flex items-center justify-center text-gray-600">
                            <span className="italic">Interactive Flight Path Visualization</span>
                        </div>
                    </div>
                </div>

                {/* Timeline & Metadata */}
                <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 h-full">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-gray-400" />
                            Automated Timeline
                        </h3>

                        <div className="relative border-l border-white/10 ml-3 space-y-8 pl-8">
                            <div className="relative">
                                <div className="absolute -left-[39px] w-5 h-5 rounded-full bg-gray-800 border-2 border-gray-600" />
                                <div className="text-sm font-bold text-gray-400">02:34:08 AM</div>
                                <div className="text-gray-300">Intrusion Detected (Zone 4)</div>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[39px] w-5 h-5 rounded-full bg-flyt-accent border-2 border-flyt-accent" />
                                <div className="text-sm font-bold text-flyt-accent">02:34:25 AM</div>
                                <div className="text-white font-medium">Drone 1 Auto-Launch</div>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[39px] w-5 h-5 rounded-full bg-green-500 border-2 border-green-500" />
                                <div className="text-sm font-bold text-green-500">02:36:20 AM</div>
                                <div className="text-white font-medium">Security Team Arrival</div>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[39px] w-5 h-5 rounded-full bg-gray-600 border-2 border-gray-600" />
                                <div className="text-sm font-bold text-gray-500">02:38:00 AM</div>
                                <div className="text-gray-500">Incident Closed</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center pt-6">
                <button
                    onClick={onReset}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium transition-all hover:scale-105 active:scale-95"
                >
                    Return to Monitoring
                </button>
            </div>
        </div>
    );
};

export default EvidencePreview;
