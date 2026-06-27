import React, { useState, useEffect } from 'react';
import './Certificates.css';
import useScrollAnimation from '../hooks/useScrollAnimation';
import FloatingDoodles from './FloatingDoodles';
import { Users, Bot, Gamepad2, BadgeCheck, ExternalLink, FileSpreadsheet, Award, ShieldAlert, Cpu, X } from 'lucide-react';

const Certificates = () => {
    useScrollAnimation();

    const certificates = [
        {
            title: 'Oracle Cloud AI Foundations',
            issuer: 'Oracle University',
            date: '2025',
            icon: <Bot size={20} />,
            color: 'var(--color-primary)',
            idTag: 'CERT-ORCL-AI-902',
            nodeNum: '01',
            hash: '0x8b5fa92d114c0a',
            credentialUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=F9286A5BCCDE0BE243A01E58F4916994D4B29C14486E63A8A4E80EACB10C4DB0',
            image: '/Certs/AbdullahsOracleeCertificate_page-0001.jpg'
        },
        {
            title: 'HP AI for Business Professionals',
            issuer: 'HP LIFE',
            date: '2025',
            icon: <Award size={20} />,
            color: 'var(--color-primary)',
            idTag: 'CERT-HP-AI-102',
            nodeNum: '02',
            hash: '0x610efc8ce92f',
            credentialUrl: 'https://www.life-global.org/certificate/610efc8c-e92f-41d0-bc14-b7d2d3f8ca69',
            image: '/Certs/HP AI for busines Proessionals.png'
        },
        {
            title: 'Huawei Algorithm & Program Design',
            issuer: 'Huawei',
            date: '2025',
            icon: <Cpu size={20} />,
            color: 'var(--color-primary)',
            idTag: 'CERT-HW-APD-301',
            nodeNum: '03',
            hash: '0x306626hwalg',
            credentialUrl: null,
            image: '/Certs/Huawei Algorithm and Program Design.png'
        },
        {
            title: 'Business Analytics with Excel',
            issuer: 'Microsoft Partner Program',
            date: '2025',
            icon: <FileSpreadsheet size={20} />,
            color: 'var(--color-primary)',
            idTag: 'CERT-MSFT-AN-107',
            nodeNum: '04',
            hash: '0x32fd90e11ab9c',
            credentialUrl: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIyOTczIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvOTgwOTA4OF8xMDAyNTcxOF8xNzcwMzI2NTM1MTQ0LnBuZyIsInVzZXJuYW1lIjoiQWJkdWxsYWggRmFpc2FsIn0%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F5712%2FBusiness-Analytics-with-Excel-Beginner-Course%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1392848493742485176&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVL4oyS89w8couN0iyrytKTUstKsrMS49PKsovL04tsvUBqkpN8cwDACqi8ENBAAAA',
            image: '/Certs/MicrosoftCert.jpg'
        },
        {
            title: 'ACM Technical Member',
            issuer: 'LGU ACM Chapter',
            date: '2024 - Present',
            icon: <Users size={20} />,
            color: 'var(--color-primary)',
            idTag: 'MEMBER-ACM-LGU',
            nodeNum: '05',
            hash: '0xac310f829db19a',
            credentialUrl: null,
            image: null
        },
        {
            title: 'Top 10 Finalist (TechSphere)',
            issuer: 'LGU Intra Tech Event',
            date: '2024',
            icon: <Award size={20} />,
            color: 'var(--color-primary)',
            idTag: 'FINALIST-TECH-409',
            nodeNum: '06',
            hash: '0x992db1c08fe340',
            credentialUrl: '/image.png',
            image: '/image.png'
        }
    ];

    const [selectedIdx, setSelectedIdx] = useState(0);
    const [activeCert, setActiveCert] = useState(certificates[0]);
    const [isProjecting, setIsProjecting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Prevent background scroll when preview modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isModalOpen]);

    const handleSelectCert = (idx) => {
        if (idx === selectedIdx) return;
        setIsProjecting(true);
        setSelectedIdx(idx);
        
        setTimeout(() => {
            setActiveCert(certificates[idx]);
            setIsProjecting(false);
        }, 350);
    };

    const handleCredentialClick = (url) => {
        if (url) {
            window.open(url, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <section id="certificates" className="certificates" style={{ position: "relative" }}>
            <FloatingDoodles section="certificates" />
            <div className="container">
                <div className="section-header anim-rise">
                    <h2>Certificates</h2>
                    <p className="section-subtitle">Holographic Pedestal Projector & Verification System</p>
                </div>

                <div className="certificates-projector-layout anim-slide-left">
                    {/* Left Column: Keycard Rack */}
                    <div className="keycard-rack-container">
                        <span className="rack-title-text">KEYCARD ARCHIVE SLOTS</span>
                        <div className="keycard-rack">
                            {certificates.map((cert, idx) => {
                                const isSelected = idx === selectedIdx;
                                return (
                                    <button
                                        key={idx}
                                        className={`keycard-slot ${isSelected ? "selected" : ""}`}
                                        style={{ "--card-color": cert.color }}
                                        onClick={() => handleSelectCert(idx)}
                                    >
                                        <div className="keycard-chip">
                                            <Cpu size={12} />
                                        </div>
                                        <div className="keycard-meta">
                                            <span className="keycard-num">{cert.nodeNum}</span>
                                            <span className="keycard-title">{cert.title}</span>
                                        </div>
                                        <div className="keycard-barcode"></div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: Holographic Pedestal Screen */}
                    <div className="hologram-projector-container">
                        <div 
                            className={`projector-glass glass ${activeCert.image ? "clickable-projector" : ""}`}
                            onClick={() => {
                                if (activeCert.image) {
                                    setIsModalOpen(true);
                                }
                            }}
                        >
                            {isProjecting ? (
                                <div className="hologram-boot">
                                    <div className="hologram-wave"></div>
                                    <span className="hologram-boot-text">FOCUSSING LENS...</span>
                                </div>
                            ) : (
                                <div className="hologram-projection animate-crt-flicker">
                                    <div className="projection-schematic"></div>
                                    <div className="projection-scanline"></div>
                                    
                                    <div className="projection-header">
                                        <span className="node-num">[NODE_0{activeCert.nodeNum}]</span>
                                        <span className="node-status">SECURE DECRYPT</span>
                                    </div>

                                    <div className="projection-details">
                                        {activeCert.image ? (
                                            <div className="projection-image-wrapper">
                                                <img 
                                                    src={activeCert.image} 
                                                    alt={activeCert.title} 
                                                    className="projection-cert-image" 
                                                />
                                                <div className="projection-image-overlay"></div>
                                                <div className="projection-image-hint">
                                                    <span>DECRYPT VISUAL</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div 
                                                className="projection-icon-orb"
                                                style={{ 
                                                    borderColor: activeCert.color,
                                                    color: activeCert.color,
                                                    boxShadow: `0 0 15px ${activeCert.color}15`
                                                }}
                                            >
                                                {activeCert.icon}
                                            </div>
                                        )}
                                        
                                        <div className="projection-text-content">
                                            <h3 className="projection-title" style={{ color: activeCert.color }}>
                                                {activeCert.title.toUpperCase()}
                                            </h3>
                                            <p className="projection-issuer">
                                                ISSUER: {activeCert.issuer.toUpperCase()}
                                            </p>
                                            <p className="projection-date">
                                                TIMESTAMP: {activeCert.date.toUpperCase()}
                                            </p>
                                            <div className="projection-hash">
                                                HASH: <code>{activeCert.hash}</code>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="projection-action">
                                        {activeCert.credentialUrl ? (
                                            <button
                                                className="verify-action-btn"
                                                style={{ "--accent": activeCert.color }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCredentialClick(activeCert.credentialUrl);
                                                }}
                                            >
                                                <ExternalLink size={12} />
                                                <span>VERIFY SIGNATURE</span>
                                            </button>
                                        ) : (
                                            <div className="verify-signed-badge">
                                                <BadgeCheck size={12} />
                                                <span>LOCAL SYSTEM VERIFIED</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="projector-emitter-base">
                            <div className="emitter-lens"></div>
                            <div className="emitter-beams"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expanded Certificate Lightbox Modal */}
            {isModalOpen && activeCert.image && (
                <div className="cert-lightbox-modal" onClick={() => setIsModalOpen(false)}>
                    <div className="cert-lightbox-content-box">
                        <div className="cert-lightbox-display-area" onClick={(e) => e.stopPropagation()}>
                            <div className="cert-lightbox-polaroid">
                                <div className="cert-lightbox-image-container">
                                    <img
                                        src={activeCert.image}
                                        alt={activeCert.title}
                                    />
                                </div>
                                <div className="cert-lightbox-caption">
                                    <h3 className="cert-lightbox-title">{activeCert.title.toUpperCase()}</h3>
                                    <p className="cert-lightbox-subtitle">ISSUED BY: {activeCert.issuer.toUpperCase()}</p>
                                    <div className="cert-lightbox-hash">
                                        HASH: <code>{activeCert.hash}</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Certificates;
