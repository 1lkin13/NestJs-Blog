import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger yapılandırması
  const config = new DocumentBuilder()
    .setTitle('Blog API') // API başlığı
    .setDescription('Blog API in Nest js by ilkin') // API açıklaması
    .setVersion('1.0') // API versiyonu
   
    .build();

  // Swagger dokümantasyonunu oluşturuyoruz
  const document = SwaggerModule.createDocument(app, config);

  // Swagger UI'yi '/api' endpoint'ine bağlıyoruz
  SwaggerModule.setup('api', app, document);

  // Uygulamayı başlatıyoruz
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
