package br.com.db1.service.util;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.CreateBucketRequest;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

@Component
public class ImageUtil {

    private static final String ARQUIVOS_APP_DO_BEM_S3 = "arquivos-app-do-bem-s3";

    private final Logger log = LoggerFactory.getLogger(ImageUtil.class);

    @Value("${aws.s3.key}")
    private String key;

    @Value("${aws.s3.secret}")
    private String secret;

    private ImageUtil() {
    }

    public String uploadImageS3(String base64Image, String fileName, Long entidadeId, String tipo) {
        log.info("Realizando upload de arquivo.");
        byte[] bi = org.apache.commons.codec.binary.Base64.decodeBase64(base64Image);
        InputStream fis = new ByteArrayInputStream(bi);
        BasicAWSCredentials creds = new BasicAWSCredentials(key, secret);
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(creds)).withRegion(Regions.US_EAST_1).build();
        String bucketName = createBucket(s3Client);
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(bi.length);
        metadata.setCacheControl("public, max-age=31536000");
        s3Client.putObject(bucketName, tipo + entidadeId + "/" + fileName, fis, metadata);
        s3Client.setObjectAcl(bucketName, tipo + entidadeId + "/" + fileName, CannedAccessControlList.PublicRead);
        return tipo + entidadeId + "/" + fileName;
    }

    public void deleteObject(String objectKey){
        log.info("Removendo o arquivo do S3.");
        BasicAWSCredentials creds = new BasicAWSCredentials(key, secret);
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(creds)).withRegion(Regions.US_EAST_1).build();
        s3Client.deleteObject(new DeleteObjectRequest(ARQUIVOS_APP_DO_BEM_S3, objectKey));
    }

    private static String createBucket(AmazonS3 s3Client) {
        String bucketName = ARQUIVOS_APP_DO_BEM_S3;
        if (!(s3Client.doesBucketExistV2(bucketName))) {
            s3Client.createBucket(new CreateBucketRequest(
                bucketName));
        }
        return bucketName;
    }
}
