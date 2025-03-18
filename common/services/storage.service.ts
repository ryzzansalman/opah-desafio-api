import { Injectable } from '@nestjs/common';
  import { Storage } from '@google-cloud/storage';
  import * as fs from 'fs';

  @Injectable()
  export class StorageService {
    private storage: Storage;

    constructor() {
      const credentials = {
        projectId: process.env.GCP_PROJECT_ID ?? 'rapida-develop',
        clientEmail: process.env.GCP_CLIENT_EMAIL ?? 'storage@rapida-develop.iam.gserviceaccount.com',
        privateKey: process.env.GCP_PRIVATE_KEY ?? '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCPQ2r+EFgIpmgw\nbOm7S4qr935uKBR0tnfpLVhFthNy6bL1j7cfYKMiRKeNBoUeO1VJWK1MFSH5HZLu\nbQKjK9LiDkLc63tjlCpGxDhQItLHztf06KRH1S+Klzm19L2VVe7gEvTP/I/9yiWB\n2+7S97/A6WeRjB7WcNQ9wL+yHz+RGhWare1B9u9pX3+9V8axCY4ZZSGKfzSMZwA1\nA87LXrFqbqiZYFfIRVI1/XeOZ11Xtjb4jmvK4dKDWii9M228hoNdld0NRl9i9RCL\nvR8W8GuZYH/9acXMNKx1/Vxlei6MTDXAiigICvgV24YL7aAqxtQzq5QrZkPEZd/e\nWZHWwgJDAgMBAAECggEAQugafMMHSirlN9B1rCoQflWcrzd6rjNVdwndUtlA5gbs\ntDBFNps8NNHZakxkOQU+xH1smb642g4Mw9sXQztBRp+gbGpxesUEpX4YSpyo0fXw\n94j6yC1xAYm0wxykuayjXfScbtImMUGKGMatF8vqut6GpvvInx+cj6aIIFjlqA7S\ngb+ssxyugulbtcNkwTGlI1NvB0O8plahJbP/gJxFdfKRCCU2TxNM4F0devqttQu/\nv5eb7VdX6Cb5dLTtYhC+nBr7hNiUFdsS+dciHjnyhtbvlYxdu1DOTS/PGgaRT2Uf\nbPWsxX1b1zp5s0Leao1s3t5281TJXtPR95vMRTlboQKBgQDICZbaRDfP6zrJTg8f\nxoE81wB/pWzMXW08BRAF84ntzvof9ZJlf8niYwun3SVGfFO/TUdNjv3/aaBjCaQp\nNFBpMbqTty4lidiLJ6+IBpqyhIxtCjvIHFJ0/wWjaXibe0EsrV4WaJXwbhPzO/Jg\nkjvG8aKED45sMaOKSUOszF/TMwKBgQC3V76NnFXHw94dS55QEzy6cCo/fmNHuMe8\nkr1MkG/iU6YxC4i0YMZYmYZtCX1eR8NInBoy06d+BmwdaPckBVh29J14dglL754s\no9yky25Me9HwCLv+ivfocNX6ukRgMCVESsJVBxzCw4VJ4TLHxtCP8c3dA6Gad+ik\nwv9/I/sUsQKBgQCTrbin1Nsbbb8NpMo3nDYHM3dTxU3oJkUhnV8x9ZTrcvVnqMV2\nl3v03UhamkINonW1cpjkYl+UM2fMFe8S2GNQ9fyXVxIDdpveR+Mn2jBVANQnH/n4\nhyg85ZVFCfWXW8xG7oraokWnpaym0qfisbLd8cAYHN/5ckAZNHN4270WzwKBgQCe\nBxtPo/ir/r9sMMl765jkedlwcNfR8gr3FuPjInvNcJxGmdJy5xcPNwUO5qcQpHpG\nE4bhWF192rtFfjvG6HSf06gHNHY+5YJIp9R+lnmzouYJJv4jIFUeHGPTgMl+vwDg\nJC/safz4Qt6YF2tVlqAd8iWm4oJgSgpUOV9PjwvTgQKBgEt5phIjO9OXiE/The+Q\nolIiTrvkXAMO4+Oz5nO/T+nzUg58x7ysfI3iM2jLOF9W8CmB2XZlBcD1AJRTJ004\n7RUL2uoohNywcxOVOjn6wrKLpI7iBu56Xw9M6tRtUsLURWepmxlb5NoZ9oKpohQy\n2ex+0z0lMK5XcreONdpbem5i\n-----END PRIVATE KEY-----\n'.replace(/\\n/g, '\n'),
      };

      this.storage = new Storage({
        projectId: credentials.projectId,
        credentials: {
          client_email: credentials.clientEmail,
          private_key: credentials.privateKey,
        },
      });
    }

    async uploadFile(bucketName: string, file: Express.Multer.File, remoteFileName: string): Promise<string> {
      const readableStream = fs.createReadStream(file.path);

      const writeStream = this.storage.bucket(bucketName).file(remoteFileName).createWriteStream();
      await new Promise((resolve, reject) => {
        readableStream.pipe(writeStream)
          .on('finish', resolve)
          .on('error', reject);
      });
      const downloadLink = `https://storage.googleapis.com/${bucketName}/${remoteFileName}`;

      console.info(`Arquivo ${remoteFileName} enviado para o Cloud Storage.Link para download: ${downloadLink}`);

      return downloadLink;
    }
  }
  