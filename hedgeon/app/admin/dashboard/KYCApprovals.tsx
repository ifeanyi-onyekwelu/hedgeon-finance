'use client';

import React from 'react';
import { Card, Button, Image, List } from 'antd';

const KYCApprovals = ({ kycs }: any) => {

    return (
        <Card title="KYC Approvals" className="mb-6">
            <List
                itemLayout="vertical"
                dataSource={kycs}
                renderItem={(item: any) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.userId.name}
                            description={
                                <div className="flex gap-4">
                                    <Image
                                        width={200}
                                        src={item.idDocumentUrl}
                                        alt="ID Document"
                                    />
                                    <Image
                                        width={200}
                                        src={item.proofOfAddress}
                                        alt="Proof of Address"
                                    />
                                    <Image
                                        width={200}
                                        src={item.selfieUrl}
                                        alt="Selfie"
                                    />
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default KYCApprovals;