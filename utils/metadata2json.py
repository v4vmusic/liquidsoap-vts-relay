import json
import pprint

with open('./metadata.txt', 'r') as file:
    metadata_str = file.read()

# Convert the string to a list of tuples
metadata = eval(metadata_str)

# Convert the list of tuples to a dictionary
dict_data = dict((key, value) for key, value in metadata)

# print(dict_data)
# pprint.pprint(metadata)

dict_data = dict((key, value) for key, value in metadata)

# Convert dict_data to JSON
json_data = json.dumps(dict_data, indent=4)

print(json_data)

# Write the JSON data to a file
with open('./metadata.json', 'w') as file:
    file.write(json_data)