import csv
import random
from datetime import date, datetime, timedelta
from faker import Faker
import random

fake = Faker()

OWNERS_COUNT = 1000000
CATS_COUNT = 1000000
FOODS_COUNT = 1000000
FOODS_FOR_CATS_COUNT = 10000000

def generate_email():
    letters = "abcdefghijklmnopqrstuvwxyz"
    username_length = random.randint(5, 10)
    domain_length = random.randint(5, 10)
    username = "".join(random.choice(letters) for i in range(username_length))
    domain = "".join(random.choice(letters) for i in range(domain_length))
    return f"{username}@{domain}.com"

def generate_phone():
    return random.randint(10000000, 99999999)

print("Generating owners data...")
owner_data = []
emails = set()
phones = set()
for i in range(OWNERS_COUNT):
    first_name = fake.first_name()
    last_name = fake.last_name()
    address = fake.street_address() + ", " + fake.city() + ", " + fake.country()
    email = generate_email()
    phone = generate_phone()
    while email in emails:
        email = generate_email()
    while phone in phones:
        phone = generate_phone()
    age = random.randint(18, 80)
    owner_data.append([i + 1, first_name, last_name, address, phone, email, age])
    emails.add(email)
    phones.add(phone)

with open('D:/Fukulta/Collage/Courses/Second Year/Semester 4/Systems for Design and Implementation/Laboratories/Laboratory 5/records/owners_data.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['id', 'firstName', 'lastName', 'address', 'phone', 'email', 'age'])
    for owner in owner_data:
        writer.writerow(owner)
print("Done!")

print("Generating cats data...")

colors = ['white', 'black', 'brown', 'orange', 'gray', 'silver', 'yellow']
breeds = ['Abyssinian', 'American Bobtail', 'American Curl', 'American Shorthair', 'Balinese', 'Bengal', 'Birman',
          'British Shorthair', 'Burmese', 'Chartreux', 'Cornish Rex', 'Devon Rex', 'Egyptian Mau', 'Exotic Shorthair',
          'Himalayan', 'Japanese Bobtail', 'Maine Coon', 'Manx', 'Norwegian Forest Cat', 'Persian', 'Ragdoll', 'Russian Blue',
          'Scottish Fold', 'Siamese', 'Sphynx']
descriptions = ["This cat is a cuddly ball of fluff, with the softest fur you've ever felt.",
                "With piercing green eyes and a playful personality, this cat is sure to win your heart.",
                "Graceful and elegant, this cat is a true beauty to behold.",
                "With a mischievous glint in its eye, this cat is always up to something.",
                "This cat is a true lap cat, always seeking out affection and attention.",
                "With a gentle purr and a warm disposition, this cat is the perfect companion.",
                "Curious and inquisitive, this cat is always exploring its surroundings.",
                "With a luxurious coat and a regal demeanor, this cat is fit for a king.",
                "This cat is a true adventurer, always eager to explore the great outdoors.",
                "With a playful bounce in its step, this cat is the life of the party.",
                "This cat is a true athlete, always up for a game of chase or a round of fetch.",
                "With a quiet grace and a gentle spirit, this cat is a calming presence in any home.",
                "This cat is a true foodie, always seeking out the best treats and snacks.",
                "With a deep, rumbling purr and a strong, sturdy build, this cat is a force to be reckoned with.",
                "This cat is a true artist, always expressing itself through its unique and creative meows.",
                "With a fluffy tail and a cute little nose, this cat is sure to melt your heart.",
                "This cat is a true diva, always demanding attention and admiration from those around it.",
                "With a sly grin and a mischievous twinkle in its eye, this cat is always up to something.",
                "This cat is a true snugglebug, always seeking out warmth and comfort in the arms of its owner.",
                "With a loyal heart and a fierce protective instinct, this cat is a true guardian and companion.",]

cat_data = []

for i in range(CATS_COUNT):
    name = fake.first_name()
    age = random.randint(1, 20)
    color = random.choice(colors)
    breed = random.choice(breeds)
    weight = random.randint(1, 20)
    description = random.choice(descriptions)
    ownerId = random.randint(1, 1000000)
    cat_data.append([i + 1, name, age, color, breed, weight, description, ownerId])

with open('D:/Fukulta/Collage/Courses/Second Year/Semester 4/Systems for Design and Implementation/Laboratories/Laboratory 5/records/cats_data.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['id', 'name', 'age', 'color', 'breed', 'weight', 'description', 'ownerId'])
    for cats in cat_data:
        writer.writerow(cats)
    print("Done!")


print("Generating foods data...")
food_names = [
    'Purina Pro Plan',
    'Whiskas Chicken Flavour',
    'Royal Canin Kitten',
    'Aatas Cat Ocean Delight Salmon',
    'ProDiet Chicken & Tuna',
    'Kit Cat Wild Caught Tuna & Chicken',
    'Whiskas Poultry Selection',
    'Purina Friskies Pate',
    'Aatas Cat Ocean Delight Chicken',
    'Feline Gourmet Chicken & Tuna',
    "Hill's Science Diet Indoor",
    'Blue Buffalo Wilderness Grain-Free',
    'Iams Proactive Health Adult Hairball Care',
    'Meow Mix Tender Centers',
    'Wellness Complete Health Pate Chicken Entrée',
    'Rachael Ray Nutrish Natural',
    'Merrick Purrfect Bistro Grain-Free Canned',
    'Fancy Feast Classic Tender Beef & Chicken Feast',
    'Friskies Party Mix Beachside Crunch',
    'Purina ONE Sensitive Systems Adult',
    '9Lives Daily Essentials',
    'Sheba Perfect Portions Grain-Free Cuts in Gravy',
    'Royal Canin Digest Sensitive Thin Slices in Gravy',
    'Taste of the Wild Canyon River Grain-Free',
    'Nutro Wholesome Essentials Indoor Adult'
]

food_brands = [
    '9Lives',
    'Aatas',
    'Blue Buffalo Wilderness',
    'Fancy Feast',
    'Friskies',
    "Hill's Science Diet",
    'Iams',
    'Kit Cat',
    'Merrick',
    'Meow Mix',
    'Nutro Wholesome Essentials',
    'ProDiet',
    'Purina',
    'Purina ONE',
    'Purina Friskies',
    'Rachael Ray Nutrish',
    'Royal Canin',
    'Sheba',
    'Taste of the Wild',
    'Wellness',
    'Whiskas'
]

food_types = ['dry', 'wet']

foods_data = []
for i in range(FOODS_COUNT):
    name = random.choice(food_names)
    brand = ''
    for word in name.split():
        if word in food_brands:
            brand = word
            break
    if brand == '':
        brand = random.choice(food_brands)
    price = random.randint(5, 100)
    quantity = random.randint(1, 50)
    food_type = random.choice(food_types)
    foods_data.append([i + 1, name, brand, price, quantity, food_type])


with open('D:/Fukulta/Collage/Courses/Second Year/Semester 4/Systems for Design and Implementation/Laboratories/Laboratory 5/records/foods_data.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['id', 'name', 'brand', 'price', 'quantity', 'type'])
    writer.writerows(foods_data)
print("Done!")

print("Generating foods for cats data...")
foods_for_cats_data = []
for i in range(FOODS_FOR_CATS_COUNT):
    cat_id = random.randint(1, 1000000)
    food_id = random.randint(1, 1000000)
    purchased = fake.date_between(start_date='-22y', end_date='today').strftime('%Y-%m-%d')
    place = fake.country()
    foods_for_cats_data.append([i + 1, cat_id, food_id, purchased, place])

with open('D:/Fukulta/Collage/Courses/Second Year/Semester 4/Systems for Design and Implementation/Laboratories/Laboratory 5/records/foods_for_cats_data.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['id', 'catId', 'foodId', 'purchased', 'place'])
    writer.writerows(foods_for_cats_data)
print("Done!")
