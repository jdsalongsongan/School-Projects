#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include <RFID.h>
#include <SPI.h>
#include <Servo.h>

RFID rfid(10, 9);
unsigned char status;
unsigned char str[MAX_LEN];

String accessGranted = "11162211111";

Servo lockServo;
int lockPos = 10;
int unlockPos = 90;
boolean locked = true;

int redLEDpin = 6;
int greenLEDpin = 4;

LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  SPI.begin();
  rfid.init();
  pinMode(redLEDpin, OUTPUT);
  pinMode(greenLEDpin, OUTPUT);
  digitalWrite(redLEDpin, HIGH);
  delay(200);
  digitalWrite(greenLEDpin, HIGH);
  delay(200);
  digitalWrite(redLEDpin, LOW);
  delay(200);
  digitalWrite(greenLEDpin, LOW);
  lockServo.attach(5);
  lockServo.write(lockPos);
  lcd.begin();
  lcd.backlight();
  lcd.print("Arduino Door");
  lcd.setCursor(0, 1);
  lcd.print("Lock w/ RFID");
  delay(2000);
  lcd.setCursor(0, 0);
  lcd.print("Pls Scan a Card");
  lcd.setCursor(0, 1);
  lcd.print("Status:Locked");
  lcd.setCursor(0, 0);
  Serial.println("Place card to scan...");

}

void loop() {
  // put your main code here, to run repeatedly:
  if (rfid.findCard(PICC_REQIDL, str) == MI_OK) {
    Serial.println("Card Found");
    String temp = "";
    if (rfid.anticoll(str) == MI_OK) {
      Serial.print("ID number:");
      for (int i = 0; i < 4; i++) {
        temp = temp + (0x0F & (str[i] >> 4));
        temp = temp + (0x0F & str[i]);
      }
      Serial.println(temp);
      checkAccess(temp);
    }
    rfid.selectTag(str);
  }
  rfid.halt();
}

void checkAccess(String temp){
  boolean granted = false;
  if(accessGranted == temp){
    Serial.println("Access Granted");
    lcd.setCursor(0,0);
    lcd.print("Access Granted ");
    lcd.setCursor(0, 1);
    granted  = true;
    if(locked == true){
      lcd.print("Status:Unlocked");
      lockServo.write(unlockPos);
      locked = false;
    }
    else if(locked == false){
      lcd.print("Status:Locked  ");
      lockServo.write(lockPos);
      locked = true;
    }
    lcd.setCursor(0,0);
    digitalWrite(greenLEDpin, HIGH);
    delay(200);
    digitalWrite(greenLEDpin, LOW);
    delay(200);
    digitalWrite(greenLEDpin, HIGH);
    delay(200);
    digitalWrite(greenLEDpin, LOW);
    delay(200);
    lcd.print("Pls Scan a Card");
  }
  if(granted == false){
    Serial.println("Access Denied");
    lcd.setCursor(0,0);
    lcd.print("Access Denied  ");
    digitalWrite(redLEDpin, HIGH);
    delay(200);
    digitalWrite(redLEDpin, LOW);
    delay(200);
    digitalWrite(redLEDpin, HIGH);
    delay(200);
    digitalWrite(redLEDpin, LOW);
    delay(200);
    lcd.setCursor(0,0);
    lcd.print("Pls Scan a Card");
    
  }
}
